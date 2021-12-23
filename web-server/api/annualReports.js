const db = require('../db');
const express = require('express');
const auth = require('../middleware/auth')

const router = express.Router();

router.get('/:annualReportID', auth, (req, res, next) => {

  const investorType = req.user.institutional ? 'Institution' : 'Individual';

  db.query(
    `SELECT * FROM ${investorType}AnnualReport WHERE annualReportID = ${req.params.annualReportID}`,
    function (err, results) {
      if (err) return next(err);
      res.json({ report: results[0] });
    }
  );
});

module.exports = router;
