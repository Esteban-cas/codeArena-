const Submission = require('../models/Submission')
const Challenge = require('../../challenge/models/Challenge')

exports.submitAnswer = async (req, res) => {
  const { challengeId, submittedAnswer } = req.body

  try {
    // Validación básica
    if (!challengeId || !submittedAnswer) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const challenge = await Challenge.findById(challengeId)
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' })
    }

    // Comparación simple por ahora (puedes mejorarla después)
    const isCorrect = challenge.expectedOutput.trim() === submittedAnswer.trim()

    const submission = new Submission({
      userId: req.user.userId,
      challengeId,
      submittedAnswer,
      isCorrect
    })

    await submission.save()

    res.status(201).json({
      message: 'Submission saved',
      result: isCorrect ? 'Correct answer ✅' : 'Incorrect answer ❌',
      isCorrect
    })
  } catch (error) {
    console.error('Error saving submission:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getUserSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user.userId })
      .populate('challengeId', 'difficulty')
      .sort({ createdAt: -1 })

    res.status(200).json({
      message: 'Submissions retrieved successfully',
      submissions
    })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
