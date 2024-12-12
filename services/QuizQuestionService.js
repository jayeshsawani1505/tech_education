const dbconnection = require('../config/database');

// Add new quiz question
const addQuizQuestion = async (quizData) => {
    const { courseName, language, text, options, answer, selected } = quizData;
    const query = 'INSERT INTO quiz_questions (courseName, language, text, options, answer, selected) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [courseName, language, text, options, answer, selected];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ QuizQuestionId: results.insertId });
        });
    });
};

// Update quiz question by ID
const updateQuizQuestion = async (QuizQuestionId, quizData) => {
    const { courseName, language, text, options, answer, selected } = quizData;
    const query = 'UPDATE quiz_questions SET courseName = ?, language = ?, text = ?, options = ?, answer = ?, selected = ? WHERE id = ?';
    const values = [courseName, language, text, options, answer, selected, QuizQuestionId];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Delete quiz question by ID
const deleteQuizQuestion = async (QuizQuestionId) => {
    const query = 'DELETE FROM quiz_questions WHERE id = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [QuizQuestionId], (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Get quiz question by ID
const getQuizQuestionById = async (QuizQuestionId) => {
    const query = 'SELECT * FROM quiz_questions WHERE id = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [QuizQuestionId], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

// Get all quiz questions
const getAllQuizQuestions = async () => {
    const query = 'SELECT * FROM quiz_questions ORDER BY id ASC';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

module.exports = {
    addQuizQuestion,
    updateQuizQuestion,
    deleteQuizQuestion,
    getQuizQuestionById,
    getAllQuizQuestions,
};
