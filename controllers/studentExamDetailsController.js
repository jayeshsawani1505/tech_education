const studentExamDetailsService = require('../services/studentExamDetailsService');

// Add new student exam details
const addStudentExamDetails = async (req, res) => {
    try {
        const examData = req.body;
        const result = await studentExamDetailsService.addStudentExamDetails(examData);
        res.status(201).json({ message: 'Student exam details added successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update student exam details by ID
const updateStudentExamDetails = async (req, res) => {
    try {
        const StudentExamDetailsId = req.params.id;
        const examData = req.body;
        const result = await studentExamDetailsService.updateStudentExamDetails(StudentExamDetailsId, examData);
        res.status(200).json({ message: 'Student exam details updated successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete student exam details by ID
const deleteStudentExamDetails = async (req, res) => {
    try {
        const StudentExamDetailsId = req.params.id;
        const result = await studentExamDetailsService.deleteStudentExamDetails(StudentExamDetailsId);
        res.status(200).json({ message: 'Student exam details deleted successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get student exam details by ID
const getStudentExamDetailsById = async (req, res) => {
    try {
        const StudentExamDetailsId = req.params.id;
        const result = await studentExamDetailsService.getStudentExamDetailsById(StudentExamDetailsId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStudentExamDetailsByStudentId = async (req, res) => {
    try {
        const StudentExamDetailsId = req.params.id;
        const result = await studentExamDetailsService.getStudentExamDetailsByStudentId(StudentExamDetailsId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getStudentExamDetailsByBranchId = async (req, res) => {
    try {
        const StudentExamDetailsId = req.params.id;
        const result = await studentExamDetailsService.getStudentExamDetailsByBranchId(StudentExamDetailsId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all student exam details
const getAllStudentExamDetails = async (req, res) => {
    try {
        const result = await studentExamDetailsService.getAllStudentExamDetails();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addStudentExamDetails,
    updateStudentExamDetails,
    deleteStudentExamDetails,
    getStudentExamDetailsById,
    getStudentExamDetailsByStudentId,
    getAllStudentExamDetails,
    getStudentExamDetailsByBranchId
};
