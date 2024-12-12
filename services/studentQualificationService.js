const dbconnection = require('../config/database');

// Add a new student qualification
const addQualification = async (qualificationData) => {
    const { studentId, qualification, board, passingYear, grade, attachFile } = qualificationData;

    const query = `
        INSERT INTO studentqualifications 
        (StudentId, qualification, board, passingYear, grade, attachFile) 
        VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [studentId, qualification, board, passingYear, grade, attachFile];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ id: results.insertId });
        });
    });
};

// Add a new student qualification and associate it with the student
const addQualificationAndStudent = async (qualificationData) => {
    try {
        // Step 1: Add the qualification to the studentqualifications table
        const qualification = await addQualification(qualificationData);

        return {
            success: true,
            message: 'Student qualification added successfully',
            id: qualification.id
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error occurred while adding student qualification',
            error: error.message
        };
    }
};

// Update a student qualification by ID
const updateQualification = async (id, studentId, qualificationData) => {
    const { qualification, board, passingYear, grade, attachFile } = qualificationData;

    const query = `
        UPDATE studentqualifications 
        SET qualification = ?, board = ?, passingYear = ?, grade = ?, attachFile = ? 
        WHERE id = ? AND StudentId = ?`;

    const values = [qualification, board, passingYear, grade, attachFile, id, studentId];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Delete a student qualification by ID
const deleteQualification = async (id, StudentId) => {
    const query = 'DELETE FROM studentqualifications WHERE id = ? AND StudentId = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [id, StudentId], (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Get a student qualification by ID
const getQualificationById = async (id, StudentId) => {
    const query = 'SELECT * FROM studentqualifications WHERE id = ? AND StudentId = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [id, StudentId], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

// Get all qualifications for a specific student
const getQualificationsByStudentId = async (StudentId) => {
    const query = 'SELECT * FROM studentqualifications WHERE StudentId = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [StudentId], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

const getQualifications = async () => {
    const query = `
        SELECT 
            CONCAT(rs.Name,' ',rs.Surname) AS studentName, 
            sq.*
        FROM 
            registeredstudents rs
        INNER JOIN 
            studentqualifications sq
        ON 
            rs.StudentId = sq.StudentId;
    `;

    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};


module.exports = {
    addQualification,
    updateQualification,
    deleteQualification,
    getQualificationById,
    getQualificationsByStudentId,
    addQualificationAndStudent,
    getQualifications
};
