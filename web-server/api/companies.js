const db = require('../db');
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  db.query(
    "SELECT symbol, companyName, companyID FROM Companies",
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
          res.json({ company: results[0], annualReports: annual_report_results });
        }
      );
    }
  );
});

module.exports = router;
