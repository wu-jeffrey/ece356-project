const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const PORT = process.env.PORT || 5000;

// Create connection to db
const db = mysql.createConnection({
  host: 'marmoset04.shoshin.uwaterloo.ca',
  user: 'j387wu',
  password: 'terriblepassworD123!', // Obviously should use an env var; this is to cut scope
  database: 'NHL_356',
  // database: 'db356_j387wu',
});
// Application routes
const app = express();

// API Middleware
app.use(express.json());

// API Routes
app.get('/api/companies', (req, res, next) => {
  db.query(
    'SELECT * FROM `TeamInfo`',
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
});

app.get('/api/derp', (req, res, next) => {
  console.log('derp');

  res.send({ derp: 'derp' })
});

// Static route for frontend
app.use(express.static(path.join(__dirname, 'web-client')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'web-client', 'index.html'));
});

// Bind Server
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
