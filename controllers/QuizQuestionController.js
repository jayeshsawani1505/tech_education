const quizQuestionsService = require('../services/QuizQuestionService');

// Add new quiz question
const addQuizQuestion = async (req, res) => {
    try {
        const quizData = req.body;
        const result = await quizQuestionsService.addQuizQuestion(quizData);
        res.status(201).json({ message: 'Quiz question added successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update quiz question by ID
const updateQuizQuestion = async (req, res) => {
    try {
        const QuizQuestionId = req.params.id;
        const quizData = req.body;
        const result = await quizQuestionsService.updateQuizQuestion(QuizQuestionId, quizData);
        res.status(200).json({ message: 'Quiz question updated successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete quiz question by ID
const deleteQuizQuestion = async (req, res) => {
    try {
        const QuizQuestionId = req.params.id;
        const result = await quizQuestionsService.deleteQuizQuestion(QuizQuestionId);
        res.status(200).json({ message: 'Quiz question deleted successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get quiz question by ID
const getQuizQuestionById = async (req, res) => {
    try {
        const QuizQuestionId = req.params.id;
        const result = await quizQuestionsService.getQuizQuestionById(QuizQuestionId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all quiz questions
const getAllQuizQuestions = async (req, res) => {
    try {
        const result = await quizQuestionsService.getAllQuizQuestions();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addQuizQuestion,
    updateQuizQuestion,
    deleteQuizQuestion,
    getQuizQuestionById,
    getAllQuizQuestions,
};
