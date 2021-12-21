const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const sha512 = require('js-sha512');

const jwtSecret = 'terrible-secret-such-bad-much-wow';
const router = express.Router();

// @route POST api/users
// @desc Register a New User
// @access Public
router.post('/', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) { return res.status(400).json({ msg: 'Please enter all fields' }); }

  const hash = sha512(password);
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

// @route GET api/users/login
// @desc Authenticate a user
// @access Public
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) { return res.status(400).json({ msg: 'Please enter all fields' }); }

  const hash = sha512(password);
  const sql = `
    SELECT * FROM Users
    WHERE
      email = '${email}' AND
      password = SHA2('${hash}', 512);
  `;

  db.query(sql, (err, result) => {
    console.log(sql, result)
    if (err) {
      next(err);
    } else {
      if (result.length === 1) {
        user = result[0];

        jwt.sign(
          { id: user.userID },
          jwtSecret,
          { expiresIn: 3600 * 24 * 7 },
          (err, token) => {
            if (err) { next(err); }

            res.json({
              token,
              user: {
                id: user.userID,
                email: user.email,
                admin: user.admin,
              }
            })
          }
        );
      } else {
        res.status(401).json({ msg: 'Invalid username and password combination' })
      }
    }
  });
});

module.exports = router;
