const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Access token is missing' })
  }
  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' })
    }
    req.user = user
    next()
  })
}
// This middleware checks for the presence of a JWT in the Authorization header, verifies it, and if valid, attaches the user information to the request object for further processing in the route handlers. If the token is missing or invalid, it responds with an appropriate error message.
