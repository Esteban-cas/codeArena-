const { body, validationResult } = require('express-validator')

const validateRegister = [
  body('email')
    .trim()
    .notEmpty()
    .isEmail().withMessage('email incorrecto')
    .escape(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

const validateLogin = [
  body('email').isEmail().withMessage('email incorrecto'),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

module.exports = {
  validateRegister,
  validateLogin
}
