module.exports = function verifyRole (roles) {
  return (req, res, next) => {
    const user = req.user // Assuming user is set by the authentication middleware

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    next()
  }
}
