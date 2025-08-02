const express = require('express');
const router = express.Router();
const SkillController = require('../controllers/skillController');

// GET /api/skills - Get all skills with search and filters
router.get('/', SkillController.getSkills);

// GET /api/skills/categories - Get all categories
router.get('/categories', SkillController.getCategories);

// GET /api/skills/filter-options - Get filter options
router.get('/filter-options', SkillController.getFilterOptions);

// GET /api/skills/:id - Get skill by ID
router.get('/:id', SkillController.getSkillById);

module.exports = router;