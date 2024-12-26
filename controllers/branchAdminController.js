const branchAdminService = require('../services/branchAdminService');
const s3 = require('../config/awsConfig');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // For generating unique file keys

// Add a new branch admin
const addBranchAdmin = async (req, res) => {
    try {
        const adminData = req.body;

        if (req.file) {
            // Extract file details
            const fileContent = req.file.buffer; // Access file buffer from multer
            const fileExtension = path.extname(req.file.originalname);
            const uniqueFileName = `branchAdmin/${uuidv4()}${fileExtension}`;

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

            // Save file URL in admin data
            adminData.Image = uploadResult.Location; // S3 file URL
        }

        // Save admin data in the database
        const result = await branchAdminService.addBranchAdminAndUser(adminData);
        res.status(201).json({ message: "Branch admin added successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a branch admin by ID
const updateBranchAdmin = async (req, res) => {
    try {
        const BranchAdminID = req.params.id;
        const adminData = req.body;
        const result = await branchAdminService.updateBranchAdmin(BranchAdminID, adminData);
        res.status(200).json({ message: "Branch admin updated successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a branch admin by ID
const deleteBranchAdmin = async (req, res) => {
    try {
        const BranchAdminID = req.params.id;
        const result = await branchAdminService.deleteBranchAdmin(BranchAdminID);
        res.status(200).json({ message: "Branch admin deleted successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a branch admin by ID
const getBranchAdminById = async (req, res) => {
    try {
        const BranchAdminID = req.params.id;
        const result = await branchAdminService.getBranchAdminById(BranchAdminID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all branch admins
const getAllBranchAdmins = async (req, res) => {
    try {
        const result = await branchAdminService.getAllBranchAdmins();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addBranchAdmin,
    updateBranchAdmin,
    deleteBranchAdmin,
    getBranchAdminById,
    getAllBranchAdmins, // Add this to the exports
};;
