const db = require('../db');
const express = require('express');

const router = express.Router();

router.get('/all/:sectorID?/:industryID?', (req, res, next) => {
  let sql = "SELECT symbol, companyName, companyID FROM Companies"
  if (req.params.sectorID && req.params.industryID) {
    sql = `SELECT symbol, companyName, companyID
            FROM Companies
            WHERE industryID = ${req.params.industryID}`
  } else if (req.params.sectorID) {
    sql = `SELECT symbol, companyName, companyID
            FROM Companies AS C
              INNER JOIN Industries AS I ON I.industryID = C.industryID
            WHERE I.sectorID = ${req.params.sectorID}`
  }

  db.query(
    sql,
    function (err, results) {
      if (err) return next(err);
      res.json({ companies: results });
    }
  );
});

router.get('/:companyID', (req, res, next) => {
  db.query(`
    SELECT C.symbol, companyName, C.companyID, numberOfEmployees, city, stateCountry, I.name AS industryName, S.sectorName,
      L.name AS leaderName, L.age AS leaderAge, L.gender AS leaderGender
    FROM Companies AS C
      INNER JOIN Industries AS I ON C.industryID = I.industryID
      INNER JOIN Sectors AS S ON I.sectorID = S.sectorID
      INNER JOIN Leaders AS L ON L.companyID = C.companyID
    WHERE C.companyID = ${req.params.companyID}
    `,
    function (err, results) {
      if (err) return next(err);

      db.query(`
        SELECT year, annualReportID, revenue, revenueGrowth, dividendYield
        FROM AnnualReports
        WHERE companyID = ${req.params.companyID}
        `,
        function (ar_err, annual_report_results) {
          if (ar_err) return next(ar_err);

          db.query(`
            WITH
              CompanyStats as (SELECT date, volume, open, high, low, close, adjclose FROM DayStats WHERE companyID = ${req.params.companyID})

            SELECT * FROM CompanyStats
            WHERE date = (SELECT MAX(date) FROM CompanyStats);
            `,
            function (ds_err, ds_results) {
              if (ds_err) return next(ds_err);

              db.query(`SELECT headline, url, publisher, date FROM Articles WHERE companyID = ${req.params.companyID} ORDER BY date desc;`,
                function (art_err, article_results) {
                  if (art_err) return next(art_err);

                  res.json({
                    company: results[0],
                    annualReports: annual_report_results,
                    mostRecentDayStat: ds_results[0],
                    articles: article_results,
                  });
                })
            }
          );
        }
      );
    }
  );
});

router.get('/:companyID/history', (req, res, next) => {
  db.query(`
    SELECT date, open, close, volume, high, low, C.companyName AS companyName
    FROM Companies AS C
      INNER JOIN DayStats ON C.companyID = DayStats.companyID
    WHERE C.CompanyID = ${req.params.companyID} ORDER BY date DESC;
    `,
    function (err, results) {
      if (err) return next(err);
      let dayStats = [];
      let company = {};
      if (results.length > 0) {
        dayStats = results.map(({ companyName, companyID, ...dayStats }) => dayStats)
        company = {
          companyID: req.params.companyName,
          companyName: results[0].companyName
        }
      }

      res.json({ dayStats: dayStats, company: company });
    }
  );
});

module.exports = router;
