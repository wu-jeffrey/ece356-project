const mysql = require('mysql2');

// Create connection to db
const db = mysql.createConnection({
  host: 'marmoset04.shoshin.uwaterloo.ca',
  user: 'j387wu',
  password: 'terriblepassworD123!', // Obviously should use an env var; this is to cut scope
  // database: 'NHL_356',
  database: 'db356_j387wu',
});

module.exports = db;
