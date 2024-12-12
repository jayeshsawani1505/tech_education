const dbconnection = require('../config/database');

// Add a new branch
const addBranch = async (branchData) => {
    const { BranchName, IsActive, CreatedOn } = branchData;
    const query = 'INSERT INTO branch (BranchName, IsActive, CreatedOn) VALUES (?, ?, ?)';
    const values = [BranchName, IsActive, CreatedOn];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ BranchId: results.insertId });
        });
    });
};

// Update a branch by ID
const updateBranch = async (BranchId, branchData) => {
    const { BranchName, IsActive } = branchData;
    const query = 'UPDATE branch SET BranchName = ?, IsActive = ? WHERE BranchId = ?';
    const values = [BranchName, IsActive, BranchId];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Delete a branch by ID
const deleteBranch = async (BranchId) => {
    const query = 'DELETE FROM branch WHERE BranchId = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [BranchId], (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Get a branch by ID
const getBranchById = async (BranchId) => {
    const query = 'SELECT * FROM branch WHERE BranchId = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [BranchId], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

// Get a branch
const getBranch = async () => {
    const query = 'SELECT * FROM branch';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

module.exports = {
    addBranch,
    updateBranch,
    deleteBranch,
    getBranchById,
    getBranch
};
