const studentQualificationsService = require('../services/studentQualificationService');

// Add a new student qualification
const addQualification = async (req, res) => {
    try {
        const qualificationData = req.body;
        if (req.file) {
            qualificationData.attachFile = `/uploads/qualifications/${req.file.filename}`; // Store file path
        }
        const result = await studentQualificationsService.addQualification(qualificationData);
        res.status(201).json({
            success: true,
            message: 'Student qualification added successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding student qualification',
            error: error.message
        });
    }
};

// Update a student qualification
const updateQualification = async (req, res) => {
    try {
        const { QualificationId, StudentId } = req.params;
        const qualificationData = req.body;
        const result = await studentQualificationsService.updateQualification(QualificationId, StudentId, qualificationData);
        if (result.affectedRows > 0) {
            res.status(200).json({
                success: true,
                message: 'Student qualification updated successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Qualification not found or no changes made'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating student qualification',
            error: error.message
        });
    }
};

// Delete a student qualification
const deleteQualification = async (req, res) => {
    try {
        const { QualificationId, StudentId } = req.params;
        const result = await studentQualificationsService.deleteQualification(QualificationId, StudentId);
        if (result.affectedRows > 0) {
            res.status(200).json({
                success: true,
                message: 'Student qualification deleted successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Qualification not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting student qualification',
            error: error.message
        });
    }
};

// Get a student qualification by ID
const getQualificationById = async (req, res) => {
    try {
        const { QualificationId, StudentId } = req.params;
        const result = await studentQualificationsService.getQualificationById(QualificationId, StudentId);
        if (result) {
            res.status(200).json({
                success: true,
                data: result
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Qualification not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching student qualification',
            error: error.message
        });
    }
};

// Get all qualifications for a student
const getQualificationsByStudentId = async (req, res) => {
    try {
        const { StudentId } = req.params;
        const results = await studentQualificationsService.getQualificationsByStudentId(StudentId);
        res.status(200).json({
            success: true,
            data: results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching qualifications',
            error: error.message
        });
    }
};

// Get all qualifications for a student
const getQualifications = async (req, res) => {
    try {
        const results = await studentQualificationsService.getQualifications();
        res.status(200).json({
            success: true,
            data: results,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching qualifications',
            error: error.message,
        });
    }
};

module.exports = {
    addQualification,
    updateQualification,
    deleteQualification,
    getQualificationById,
    getQualificationsByStudentId,
    getQualifications
};
