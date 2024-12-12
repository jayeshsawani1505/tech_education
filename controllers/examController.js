const examService = require('../services/examService');

// Add a new exam
const addExam = async (req, res) => {
    try {
        const examData = req.body;
        const result = await examService.addExam(examData);
        res.status(201).json({ message: "Exam added successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an exam by ID
const updateExam = async (req, res) => {
    try {
        const ExamId = req.params.id;
        const examData = req.body;
        const result = await examService.updateExam(ExamId, examData);
        res.status(200).json({ message: "Exam updated successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an exam by ID
const deleteExam = async (req, res) => {
    try {
        const ExamId = req.params.id;
        const result = await examService.deleteExam(ExamId);
        res.status(200).json({ message: "Exam deleted successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get an exam by ID
const getExamById = async (req, res) => {
    try {
        const ExamId = req.params.id;
        const result = await examService.getExamById(ExamId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all exams
const getAllExams = async (req, res) => {
    try {
        const result = await examService.getAllExams();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addExam,
    updateExam,
    deleteExam,
    getExamById,
    getAllExams,
};
