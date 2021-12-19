const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;

// Application routes
const app = express();

// API Middleware
app.use(express.json());
app.use('/api/companies/', require('./api/companies'));

// Static route for frontend
app.use(express.static(path.join(__dirname, 'web-client')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'web-client', 'index.html'));
});

// Bind Server
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
