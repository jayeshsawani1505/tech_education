const express = require('express');
const router = express.Router();
const quizQuestionsController = require('../controllers/QuizQuestionController');

// Routes for quiz questions management
router.post('/', quizQuestionsController.addQuizQuestion);            // Add new quiz question
router.put('/:id', quizQuestionsController.updateQuizQuestion);     // Update quiz question by ID
router.delete('/:id', quizQuestionsController.deleteQuizQuestion);  // Delete quiz question by ID
router.get('/:id', quizQuestionsController.getQuizQuestionById);   // Get quiz question by ID
router.get('/', quizQuestionsController.getAllQuizQuestions);        // Get all quiz questions

module.exports = router;
