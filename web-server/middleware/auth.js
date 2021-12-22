const jwt = require('jsonwebtoken');
const jwtSecret = 'terrible-secret-such-bad-much-wow';

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) {
    res.status(401).json({ error: { msg: 'No token, Authorization denied' } });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    // Add user from payload
    req.userID = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ error: { msg: 'Invalid Token' } });
  }
}

module.exports = auth;
