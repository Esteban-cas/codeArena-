const express = require('express')
const router = express.Router()
const challengeController = require('../controllers/challenge.controller')
const authenticateToken = require('../../../shared/middlewares/auth.middleware')
const authorizeRole = require('../../../shared/middlewares/role.middleware')
const {
  validateCreateChallenge,
  validateUpdateChallenge,
  validateDeleteChallenge
} = require('../validators/challenge.validators')
const handleValidation = require('../../../shared/middlewares/handle.validation')

router.post('/',
  authenticateToken,
  authorizeRole('admin'), validateCreateChallenge, handleValidation, challengeController.createChallenge)

router.get('/', challengeController.getAllChallenges)
router.get('/:id', challengeController.getChallengeById)

router.put('/:id',
  authenticateToken,
  authorizeRole('admin'), validateUpdateChallenge, handleValidation, challengeController.updateChallenge)

router.delete('/:id',
  authenticateToken,
  authorizeRole('admin'), validateDeleteChallenge, handleValidation, challengeController.deleteChallenge)

module.exports = router
