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
    SELECT symbol, companyName, companyID, numberOfEmployees, city, stateCountry, I.name AS industryName, S.sectorName
      FROM (Companies AS C INNER JOIN Industries AS I ON C.industryID = I.industryID) INNER JOIN Sectors AS S ON I.sectorID = S.sectorID
      WHERE companyID = ${req.params.companyID}
    `,
    function (err, results) {
      if (err) return next(err);
      res.json({ company: results[0] });
    }
  );
});

module.exports = router;
