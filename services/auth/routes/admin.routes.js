const express = require('express')
const router = express.Router()

const verifyToken = require('../../../shared/middlewares/verifyToken')
const verifyRole = require('../../../shared/middlewares/verifyRole')

router.get('/dashboard', verifyToken, verifyRole('admin'), async (req, res) => {
  res.json({
    message: 'Welcome to the admin dashboard',
    user: req.user
  })
})

module.exports = router
