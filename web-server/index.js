const express = require('express');
const path = require('path');
const httpErrorHandler = require('./middleware/http-error-handler');

const PORT = process.env.PORT || 5000;

// Application routes
const app = express();

// API Middleware
app.use(express.json());
app.use('/api/home/', require('./api/home'));
app.use('/api/companies/', require('./api/companies'));
app.use('/api/users/', require('./api/users'));
app.use('/api/sectors/', require('./api/sectors'));
app.use('/api/industries/', require('./api/industries'));
app.use('/api/annual-reports/', require('./api/annualReports'));

// Static route for frontend
app.use(express.static(path.join(__dirname, 'web-client')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'web-client', 'index.html'));
});

app.use(httpErrorHandler);

// Bind Server
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
