const registeredStudentsService = require('../services/registeredStudentsService');
const s3 = require('../config/awsConfig');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // For generating unique file keys

const addStudent = async (req, res) => {
    try {
        const studentData = req.body;

        if (req.file) {
            // Extract file details
            const fileContent = req.file.buffer; // Access file buffer from multer
            const fileExtension = path.extname(req.file.originalname);
            const uniqueFileName = `students/${uuidv4()}${fileExtension}`;

            // S3 upload parameters
            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME, // S3 bucket name
                Key: uniqueFileName, // File name to save as
                Body: fileContent,
                ContentType: req.file.mimetype, // Ensure correct MIME type
                ACL: 'public-read' // Optional: Make the file public
            };

            // Upload to S3
            const uploadResult = await s3.upload(params).promise();

            // Save file URL in student data
            studentData.StudentImage = uploadResult.Location; // S3 file URL
        }

        // Save student data in the database
        const result = await registeredStudentsService.addStudentAndUser(studentData);
        res.status(201).json({ message: "Student added successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a student by ID
const updateStudent = async (req, res) => {
    try {
        const StudentId = req.params.id;
        const data = req.body;
        const result = await registeredStudentsService.updateStudent(StudentId, data);
        res.status(200).json({ message: "Student updated successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a student by ID
const deleteStudent = async (req, res) => {
    try {
        const StudentId = req.params.id;
        const result = await registeredStudentsService.deleteStudent(StudentId);
        res.status(200).json({ message: "Student deleted successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a student by ID
const getStudentById = async (req, res) => {
    try {
        const StudentId = req.params.id;
        const result = await registeredStudentsService.getStudentById(StudentId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const result = await registeredStudentsService.getAllStudents();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get students by BranchID
const getStudentsByBranch = async (req, res) => {
    const { branchID } = req.params;

    try {
        if (!branchID) {
            return res.status(400).json({ error: "BranchID is required" });
        }

        const result = await registeredStudentsService.getStudentsByBranch(branchID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addStudentsFromExcel = async (req, res) => {
    try {
        const file = req.file;

        // Check if a file was uploaded
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Parse the Excel file and add student and user records
        const result = await registeredStudentsService.parseExcelFileAndAddRecords(
            file.path,
            registeredStudentsService.addStudentAndUser
        );

        res.status(201).json({ message: result.message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const generateNumber = async (req, res) => {
    try {
        // Call the service to generate a new fee number
        const newFeeNumber = await registeredStudentsService.registrationService();

        // Send the response with the generated fee number
        res.status(200).json({
            message: "student number generated successfully.",
            data: { fee_number: newFeeNumber }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error generating fee number.",
            error: error.message
        });
    }
};
module.exports = {
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
    getAllStudents,
    getStudentsByBranch,
    addStudentsFromExcel,
    generateNumber
};
