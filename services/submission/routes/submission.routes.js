const express = require('express')
const router = express.Router()

const { submitAnswer, getUserSubmissions } = require('../controllers/submission.controller')
const authenticateToken = require('../../../shared/middlewares/auth.middleware')
const { validateSubmission } = require('../validators/submission.validators')

router.post('/', authenticateToken, validateSubmission, submitAnswer)
router.get('/', authenticateToken, getUserSubmissions)

module.exports = router
