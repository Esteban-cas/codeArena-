const { body, validationResult } = require('express-validator')

const validateSubmission = [
  body('challengeId')
    .isMongoId().trim().withMessage('Invalid challenge ID')
    .notEmpty().withMessage('Challenge ID is required'),
  body('submittedAnswer')
    .notEmpty().trim().withMessage('Submitted answer is required').isLength({ min: 1, max: 500 }).withMessage('Answer must be between 1 and 500 characters'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

module.exports = {
  validateSubmission
}
