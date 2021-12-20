const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');

const router = express.Router();

// @route POST api/users
// @desc Register a New User
// @access Public
router.post('/', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) { return res.status(400).json({ msg: 'Please enter all fields' }); }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) { throw err; }

      const sql = `INSERT INTO Users (email, password) VALUES (
        '${email}', SHA2('${hash}', 512)
      );`;

      db.query(sql, (err, result) => {
        if (err) {
          next(err);
        } else {
          console.log(`User Created: ${email}`);
          res.send(result);
        }

      });

    });
  });
});

module.exports = router;
