const express = require('express')
const app = express()

const helmet = require('helmet')

const authRoutes = require('../services/auth/routes/auth.routes')
const adminRoutes = require('../services/auth/routes/admin.routes')
const challengeRoutes = require('../services/challenge/routes/challenges.routes')
const submissionRoutes = require('../services/submission/routes/submission.routes')

const morgan = require('morgan')

const cors = require('cors')
app.use(cors({
  origin: 'https://codearenaecv.netlify.app',
  credentials: true
}))

// Middleware
app.use(express.json())
app.use(morgan('dev'))

// Security headers
const rateLimit = require('express-rate-limit')
const { xss } = require('express-xss-sanitizer')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 90 // Limit each IP to 90 requests per windowMs
})

// middleware security
app.use(helmet())
app.use(limiter)
app.use(xss())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/challenges', challengeRoutes)
app.use('/api/submissions', submissionRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
  console.log('Hello World!')
})

module.exports = app
