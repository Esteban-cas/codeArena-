const Challenge = require('../models/Challenge')

exports.createChallenge = async (req, res) => {
  const { title, description, difficulty, category, expectedOutput } = req.body
  try {
    if (!title || !description || !difficulty || !category || !expectedOutput) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const newChallenge = new Challenge({
      title,
      description,
      difficulty,
      category,
      expectedOutput
    })

    await newChallenge.save()
    res.status(201).json({ message: 'Challenge created successfully', challenge: newChallenge })
  } catch (error) {
    console.error('Error creating challenge:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find()
    res.status(200).json({ message: 'Challenges retrieved successfully', challenges })
  } catch (error) {
    console.error('Error fetching challenges:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getChallengeById = async (req, res) => {
  const { id } = req.params
  try {
    const challenge = await Challenge.findById(id)
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' })
    }
    res.status(200).json({ message: 'Challenge retrieved successfully', challenge })
  } catch (error) {
    console.error('Error fetching challenge:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

/*
exports.updateChallenge = async (req, res) => {
  const { title, description, difficulty, category } = req.body

  try {
    if (req.params.id.length !== 24 || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid challenge ID' })
    }

    const challenge = await Challenge.findById(req.params.id)
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' })
    }

    if (challenge.createdBy.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this challenge' })
    }

    if (title) challenge.title = title
    if (description) challenge.description = description
    if (difficulty) challenge.difficulty = difficulty
    if (category) challenge.category = category

    await challenge.save()
    res.status(200).json({ message: 'Challenge updated successfully', challenge })
  } catch (error) {
    console.error('Error updating challenge:', error)
    res.status(500).json({ message: 'Server error' })
  }
} */
exports.updateChallenge = async (req, res) => {
  try {
    const updated = await Challenge.findByIdAndUpdate(
      req.params.id, req.body, { new: true })
    updated
      ? res.status(200).json({ message: 'Challenge updated successfully', challenge: updated })
      : res.status(404).json({ message: 'Challenge not found' })
  } catch (error) {
    console.error('Error updating challenge:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' })
    }

    await Challenge.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Challenge deleted successfully' })
  } catch (error) {
    console.error('Error deleting challenge:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
