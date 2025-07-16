const { body, validationResult, param } = require('express-validator')

const validateCreateChallenge = [
  body('title')
    .notEmpty().trim()
    .withMessage('Title is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters long'),
  body('description')
    .notEmpty().trim()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters long'),
  body('difficulty')
    .notEmpty().trim()
    .withMessage('Difficulty is required')
    .isIn(['easy', 'medium', 'hard'])
    .withMessage('Difficulty must be one of the following: easy, medium, hard'),
  body('category')
    .notEmpty().trim()
    .withMessage('Category is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Category must be between 3 and 50 characters long'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

const validateUpdateChallenge = [
  body('title')
    .optional()
    .trim().isLength({ min: 5, max: 100 })
    .notEmpty()
    .withMessage('Title must be between 5 and 100 characters long')
    .escape(),
  body('description')
    .optional()
    .trim().notEmpty()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters long'),
  body('difficulty')
    .optional()
    .isIn(['easy', 'medium', 'hard'])
    .withMessage('Difficulty must be one of the following: easy, medium, hard'),
  body('category')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Category must be between 3 and 50 characters long'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

const validateDeleteChallenge = [
  param('id')
    .isMongoId()
    .withMessage('Invalid challenge ID format'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

module.exports = {
  validateCreateChallenge,
  validateUpdateChallenge,
  validateDeleteChallenge
}
