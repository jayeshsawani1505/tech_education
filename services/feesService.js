const dbconnection = require('../config/database');
const fs = require('fs');
const xlsx = require('xlsx');

const generateFeeNumber = async () => {
    return new Promise((resolve, reject) => {
        dbconnection.query('SELECT MAX(FeesId) AS last_fee_id FROM fees', (error, results) => {
            if (error) {
                console.error('Database Query Error:', error); // Log query error
                return reject(error);
            }

            console.log('Query Results:', results); // Log raw query results
            let lastFeeId = results?.[0]?.last_fee_id || null; // Handle null result

            let newFeeNumber;
            if (!lastFeeId) {
                newFeeNumber = "FEE-001"; // Initialize the first fee number
            } else {
                newFeeNumber = `FEE-${String(lastFeeId + 1).padStart(3, '0')}`; // Generate next fee number
            }
            resolve(newFeeNumber);
        });
    });
};

const parseExcelFileAndAddRecords = async (filePath, addFee) => {
    return new Promise(async (resolve, reject) => {
        try {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const jsonData = xlsx.utils.sheet_to_json(sheet);
            if (jsonData.length === 0) {
                throw new Error("Excel file is empty or has invalid structure.");
            }

            const batchSize = 50;
            let processedRecords = 0;

            for (let i = 0; i < jsonData.length; i += batchSize) {
                const batch = jsonData.slice(i, i + batchSize);
                const batchResult = await feesService.addFeesBatch(batch);
                processedRecords += batchResult.affectedRows;
            }

            fs.unlink(filePath, (err) => {
                if (err) console.error("Error deleting file:", err);
            });

            resolve({ message: `${processedRecords} records added successfully`, processedRecords, totalRecords: jsonData.length });
        } catch (error) {
            reject(error);
        }
    });
};

// Add a new fee record
const addFee = async (feeData) => {
    const { feeSrNo, StudentId, Amount } = feeData;
    const query = `INSERT INTO fees (feeSrNo,StudentId, Amount) VALUES (?, ?, ?)`;
    const values = [feeSrNo, StudentId, Amount];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ FeesId: results.insertId });
        });
    });
};

// Update a fee record by ID
const updateFee = async (FeesId, feeData) => {
    const { feeSrNo, StudentId, Amount } = feeData;
    const query = `UPDATE fees SET feeSrNo = ?, StudentId = ?, Amount = ?
                   WHERE FeesId = ?`;
    const values = [feeSrNo, StudentId, Amount, FeesId];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Delete a fee record by ID
const deleteFee = async (FeesId) => {
    const query = `DELETE FROM fees WHERE FeesId = ?`;

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [FeesId], (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Get a fee record by ID
const getFeeById = async (FeesId) => {
    const query = `SELECT  f.FeesId,
            f.feeSrNo,
            f.StudentId,
            f.Amount,
            f.CreatedOn,
            f.ModifiedOn,
            CONCAT(s.Surname, ' ', s.Name) AS StudentName, -- Merging Surname and Name
            b.BranchName,
            c.CourseName
        FROM 
            fees f
        JOIN 
            registeredstudents s ON f.StudentId = s.StudentId
        JOIN 
            branch b ON s.BranchId = b.BranchId
        JOIN 
            course c ON s.CourseId = c.CourseId WHERE f.FeesId = ?`;

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [FeesId], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

// Get all fee records
const getAllFees = async () => {
    const query = `
        SELECT 
            f.FeesId,
            f.feeSrNo,
            f.StudentId,
            f.Amount,
            f.CreatedOn,
            f.ModifiedOn,
            CONCAT(s.Surname, ' ', s.Name) AS StudentName, -- Merging Surname and Name
            b.BranchName,
            c.CourseName
        FROM 
            fees f
        JOIN 
            registeredstudents s ON f.StudentId = s.StudentId
        JOIN 
            branch b ON s.BranchId = b.BranchId
        JOIN 
            course c ON s.CourseId = c.CourseId;
    `;

    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Get fees by BranchID
const getFeesByBranch = async (branchID) => {
    const query = `
        SELECT 
            f.FeesId,
            f.feeSrNo,
            f.StudentId,
            f.Amount,
            f.CreatedOn,
            f.ModifiedOn,
            CONCAT(s.Surname, ' ', s.Name) AS StudentName, -- Merging Surname and Name
            b.BranchName,
            c.CourseName
        FROM 
            fees f
        JOIN 
            registeredstudents s ON f.StudentId = s.StudentId
        JOIN 
            branch b ON s.BranchId = b.BranchId
        JOIN 
            course c ON s.CourseId = c.CourseId
        WHERE 
            b.BranchId = ?; -- Filter by BranchId
    `;

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [branchID], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};


module.exports = {
    addFee,
    updateFee,
    deleteFee,
    getFeeById,
    getAllFees,
    getFeesByBranch,
    parseExcelFileAndAddRecords,
    generateFeeNumber
};
