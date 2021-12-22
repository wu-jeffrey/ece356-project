const db = require('../db');
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  db.query(
    "SELECT * FROM Homepage",
    function (err, results) {
      if (err) return next(err);
      res.json(results[0]);
    }
  );
});

module.exports = router;
