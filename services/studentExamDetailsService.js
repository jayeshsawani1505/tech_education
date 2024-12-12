const dbconnection = require('../config/database');

// Add new student exam details
const addStudentExamDetails = async (examData) => {
    const { StudentId, SubjectName, CorrectAnswers, TotalMarks, Grade, ExamDate } = examData;
    const query = 'INSERT INTO studentexamdetails (StudentId,SubjectName, CorrectAnswers, TotalMarks, Grade, ExamDate) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [StudentId, SubjectName, CorrectAnswers, TotalMarks, Grade, ExamDate];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ StudentExamDetailsId: results.insertId });
        });
    });
};

// Update student exam details by ID
const updateStudentExamDetails = async (StudentExamDetailsId, examData) => {
    const { CorrectAnswers, SubjectName, TotalMarks, Grade, ExamDate } = examData;
    const query = 'UPDATE studentexamdetails SET CorrectAnswers = ?, SubjectName = ?, TotalMarks = ?, Grade = ?, ExamDate = ? WHERE StudentExamDetailsId = ?';
    const values = [CorrectAnswers, SubjectName, TotalMarks, Grade, ExamDate, StudentExamDetailsId];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Delete student exam details by ID
const deleteStudentExamDetails = async (StudentExamDetailsId) => {
    const query = 'DELETE FROM studentexamdetails WHERE StudentExamDetailsId = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [StudentExamDetailsId], (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Get student exam details by ID
const getStudentExamDetailsById = async (StudentExamDetailsId) => {
    const query = 'SELECT * FROM studentexamdetails WHERE StudentExamDetailsId = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [StudentExamDetailsId], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};
const getStudentExamDetailsByStudentId = async (StudentId) => {
    const query = 'SELECT * FROM studentexamdetails WHERE StudentId = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [StudentId], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};
const getStudentExamDetailsByBranchId = async (BranchId) => {
    const query = `SELECT 
            studentexamdetails.*,
            registeredstudents.*,
            branch.BranchName,
            course.CourseName
        FROM 
            studentexamdetails
        INNER JOIN 
            registeredstudents 
        ON 
            studentexamdetails.StudentId = registeredstudents.StudentId
        JOIN 
            branch 
        ON 
            registeredstudents.BranchId = branch.BranchId
        JOIN 
            course 
        ON 
            registeredstudents.CourseID = course.CourseId WHERE registeredstudents.BranchId = ? `;

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [BranchId], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Get all student exam details
const getAllStudentExamDetails = async () => {
    const query = `
        SELECT 
            studentexamdetails.*,
            registeredstudents.*,
            branch.BranchName,
            course.CourseName
        FROM 
            studentexamdetails
        INNER JOIN 
            registeredstudents 
        ON 
            studentexamdetails.StudentId = registeredstudents.StudentId
        JOIN 
            branch 
        ON 
            registeredstudents.BranchId = branch.BranchId
        JOIN 
            course 
        ON 
            registeredstudents.CourseID = course.CourseId;
    `;

    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, results) => {
            if (error) {
                console.error("Error executing query:", error.message);
                return reject("Failed to fetch student exam details.");
            }
            resolve(results);
        });
    });
};

module.exports = {
    addStudentExamDetails,
    updateStudentExamDetails,
    deleteStudentExamDetails,
    getStudentExamDetailsById,
    getAllStudentExamDetails,
    getStudentExamDetailsByStudentId,
    getStudentExamDetailsByBranchId
};
