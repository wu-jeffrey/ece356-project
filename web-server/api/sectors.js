const db = require('../db');
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  db.query(
    "SELECT sectorID, sectorName FROM Sectors",
    function (err, results) {
      if (err) return next(err);
      res.json(results);
    }
  );
});

module.exports = router;
