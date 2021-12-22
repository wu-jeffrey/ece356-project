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

module.exports = router;
