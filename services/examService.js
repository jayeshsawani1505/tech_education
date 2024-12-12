const dbconnection = require('../config/database');

// Add a new exam
const addExam = async (examData) => {
    const { ExamName } = examData;
    const query = 'INSERT INTO examformdetails (ExamName) VALUES (?)';
    const values = [ExamName];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ ExamId: results.insertId });
        });
    });
};

// Update an exam by ID
const updateExam = async (ExamId, examData) => {
    const { ExamName } = examData;
    const query = 'UPDATE examformdetails SET ExamName = ? WHERE ExamId = ?';
    const values = [ExamName, ExamId];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Delete an exam by ID
const deleteExam = async (ExamId) => {
    const query = 'DELETE FROM examformdetails WHERE ExamId = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [ExamId], (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Get an exam by ID
const getExamById = async (ExamId) => {
    const query = 'SELECT * FROM examformdetails WHERE ExamId = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [ExamId], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

// Get all exams
const getAllExams = async () => {
    const query = 'SELECT * FROM examformdetails';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

module.exports = {
    addExam,
    updateExam,
    deleteExam,
    getExamById,
    getAllExams,
};
