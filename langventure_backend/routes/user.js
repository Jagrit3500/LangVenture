const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Challenge = require('../models/Challenge');
const Path = require('../models/Path');

// GET /api/user/me - Get authenticated user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('selectedPath');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/user/set-path - Set user's selected learning path
router.post('/set-path', auth, async (req, res) => {
  try {
    const { pathId } = req.body;

    if (!pathId) {
      return res.status(400).json({ error: 'Please provide a pathId' });
    }

    // Verify path exists
    const path = await Path.findById(pathId);
    if (!path) {
      return res.status(404).json({ error: 'Path not found' });
    }

    // Update user's selected path
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { selectedPath: pathId },
      { new: true }
    ).select('-password').populate('selectedPath');

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/user/challenge - Store a text-based challenge
router.post('/challenge', auth, async (req, res) => {
  try {
    const { challengeText, pathId, lessonId, userResponse } = req.body;

    if (!challengeText) {
      return res.status(400).json({ error: 'Please provide challengeText' });
    }

    // Create challenge
    const challenge = await Challenge.create({
      user: req.user._id,
      path: pathId || null,
      lesson: lessonId || null,
      challengeText,
      userResponse: userResponse || '',
      completed: !!userResponse
    });

    const populatedChallenge = await Challenge.findById(challenge._id)
      .populate('path')
      .populate('lesson');

    res.status(201).json(populatedChallenge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/user/challenges - Get all user challenges (bonus endpoint)
router.get('/challenges', auth, async (req, res) => {
  try {
    const challenges = await Challenge.find({ user: req.user._id })
      .populate('path')
      .populate('lesson')
      .sort({ createdAt: -1 });
    
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
