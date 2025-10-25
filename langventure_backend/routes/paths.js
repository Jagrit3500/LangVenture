const express = require('express');
const router = express.Router();
const Path = require('../models/Path');
const Lesson = require('../models/Lesson');

// GET /api/paths - Get all paths with their lessons
router.get('/', async (req, res) => {
  try {
    const paths = await Path.find().sort({ createdAt: 1 });
    
    // Get lessons for each path
    const pathsWithLessons = await Promise.all(
      paths.map(async (path) => {
        const lessons = await Lesson.find({ path: path._id }).sort({ order: 1 });
        return {
          ...path.toObject(),
          lessons
        };
      })
    );

    res.json(pathsWithLessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/paths/:slug - Get single path by slug with lessons
router.get('/:slug', async (req, res) => {
  try {
    const path = await Path.findOne({ slug: req.params.slug });
    
    if (!path) {
      return res.status(404).json({ error: 'Path not found' });
    }

    // Get lessons for this path
    const lessons = await Lesson.find({ path: path._id }).sort({ order: 1 });

    res.json({
      ...path.toObject(),
      lessons
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
