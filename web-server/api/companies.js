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
    SELECT symbol, companyName, companyID, sectorName, industryName, numberOfEmployees, city, stateCountry
    FROM Companies
    WHERE companyID = ${req.params.companyID}
    `,
    function (err, results) {
      if (err) return next(err);
      res.json({ company: results[0] });
    }
  );
});

module.exports = router;
