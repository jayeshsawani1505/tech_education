const branchService = require('../services/branchService');

// Add a new branch
const addBranch = async (req, res) => {
    try {
        const branchData = req.body;
        const result = await branchService.addBranch(branchData);
        res.status(201).json({ message: "Branch added successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a branch by ID
const updateBranch = async (req, res) => {
    try {
        const BranchId = req.params.id;
        const branchData = req.body;
        const result = await branchService.updateBranch(BranchId, branchData);
        res.status(200).json({ message: "Branch updated successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a branch by ID
const deleteBranch = async (req, res) => {
    try {
        const BranchId = req.params.id;
        const result = await branchService.deleteBranch(BranchId);
        res.status(200).json({ message: "Branch deleted successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a branch by ID
const getBranchById = async (req, res) => {
    try {
        const BranchId = req.params.id;
        const result = await branchService.getBranchById(BranchId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a branch
const getBranch = async (req, res) => {
    try {
        const result = await branchService.getBranch();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addBranch,
    updateBranch,
    deleteBranch,
    getBranchById,
    getBranch
};
