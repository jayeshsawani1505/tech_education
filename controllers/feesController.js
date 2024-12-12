const feesService = require('../services/feesService');

// Add a new fee record
const addFee = async (req, res) => {
    try {
        const feeData = req.body;
        const result = await feesService.addFee(feeData);
        res.status(201).json({ message: "Fee record added successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a fee record by ID
const updateFee = async (req, res) => {
    try {
        const FeesId = req.params.id;
        const feeData = req.body;
        const result = await feesService.updateFee(FeesId, feeData);
        res.status(200).json({ message: "Fee record updated successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a fee record by ID
const deleteFee = async (req, res) => {
    try {
        const FeesId = req.params.id;
        const result = await feesService.deleteFee(FeesId);
        res.status(200).json({ message: "Fee record deleted successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a fee record by ID
const getFeeById = async (req, res) => {
    try {
        const FeesId = req.params.id;
        const result = await feesService.getFeeById(FeesId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all fee records
const getAllFees = async (req, res) => {
    try {
        const result = await feesService.getAllFees();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get fees by BranchID
const getFeesByBranch = async (req, res) => {
    const { branchID } = req.params;

    try {
        if (!branchID) {
            return res.status(400).json({ error: "BranchID is required" });
        }

        const result = await feesService.getFeesByBranch(branchID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const addFeeFromExcel = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const result = await feesService.parseExcelFileAndAddRecords(
            file.path,
            feesService.addFee
        );

        res.status(201).json({
            message: `${result.message}`,
            totalRecords: result.totalRecords,
            processedRecords: result.processedRecords,
        });
    } catch (error) {
        console.error("Error in addFeeFromExcel:", error.message);
        res.status(500).json({ error: error.message });
    }
};
const generateFeeNumber = async (req, res) => {
    try {
        // Call the service to generate a new fee number
        const newFeeNumber = await feesService.generateFeeNumber();

        // Send the response with the generated fee number
        res.status(200).json({
            message: "Fee number generated successfully.",
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
    addFee,
    updateFee,
    deleteFee,
    getFeeById,
    getAllFees,
    getFeesByBranch,
    addFeeFromExcel,
    generateFeeNumber
};
