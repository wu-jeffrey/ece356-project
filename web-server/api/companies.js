const db = require('../db');
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  db.query(
    'SELECT * FROM `TeamInfo`',
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
});

router.get('/derp', (req, res, next) => {
  console.log('derp');

  db.query(
    'SELECT * FROM `TeamInfo`',
    function (err, results, fields) {
      res.send({ fields });
    }
  );

});

module.exports = router;
