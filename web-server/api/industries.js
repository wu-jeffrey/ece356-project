const db = require('../db');
const express = require('express');

const router = express.Router();


router.get('/:sectorID', (req, res, next) => {
  db.query(
    `SELECT industryID, name FROM Industries WHERE sectorID = ${req.params.sectorID}`,
    function (err, results) {
      if (err) return next(err);
      res.json(results);
    }
  );
});

module.exports = router;
