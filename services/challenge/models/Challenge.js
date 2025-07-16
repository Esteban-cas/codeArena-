const mongoose = require('mongoose')

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  expectedOutput: { type: String, required: true }
}, { timestamps: true })

const Challenge = mongoose.model('Challenge', challengeSchema)

module.exports = Challenge
