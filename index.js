const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Ensure 'uploads/branchAdmin' directory exists
const branchAdminUploadsDir = path.join(__dirname, 'uploads/branchAdmin');
if (!fs.existsSync(branchAdminUploadsDir)) {
    fs.mkdirSync(branchAdminUploadsDir, { recursive: true });
}

// Ensure 'uploads/student' directory exists
const studentUploadsDir = path.join(__dirname, 'uploads/student');
if (!fs.existsSync(studentUploadsDir)) {
    fs.mkdirSync(studentUploadsDir, { recursive: true });
}

// Ensure 'uploads/excelStudent' directory exists
const excelStudentUploadsDir = path.join(__dirname, 'uploads/excelStudent');
if (!fs.existsSync(excelStudentUploadsDir)) {
    fs.mkdirSync(excelStudentUploadsDir, { recursive: true });
}

// Ensure 'uploads/qualifications' directory exists
const qualificationsUploadsDir = path.join(__dirname, 'uploads/qualifications');
if (!fs.existsSync(qualificationsUploadsDir)) {
    fs.mkdirSync(qualificationsUploadsDir, { recursive: true });
}

// Ensure 'uploads/excelFee' directory exists
const excelFeeUploadsDir = path.join(__dirname, 'uploads/excelFee');
if (!fs.existsSync(excelFeeUploadsDir)) {
    fs.mkdirSync(excelFeeUploadsDir, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
    optionsSuccessStatus: 204,
}));
app.use(bodyParser.json());

const authRoutes = require('./routes/authRoutes');
const branchAdminRoutes = require('./routes/branchAdminRoutes');
const branchRoutes = require('./routes/branchRoutes');
const courseRoutes = require('./routes/courseRoutes');
const examRoutes = require('./routes/examRoutes');
const feesRoutes = require('./routes/feesRoutes');
const registeredStudentsRoutes = require('./routes/registeredStudentsRoutes');
const studentExamDetailsRoutes = require('./routes/studentExamDetailsRoutes');
const userRoutes = require('./routes/userRoutes');
const youtubebannerRoutes = require('./routes/youtubebannerRoutes');
const QuizQuestionRoutes = require('./routes/QuizQuestionRoutes');
const studentQualificationsRoutes = require('./routes/studentQualificationsRoutes');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/branchAdmin', branchAdminRoutes);
app.use('/api/branch', branchRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/fees', feesRoutes);
app.use('/api/registeredStudents', registeredStudentsRoutes);
app.use('/api/studentExamDetails', studentExamDetailsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/youtubebanner', youtubebannerRoutes);
app.use('/api/quiz', QuizQuestionRoutes);
app.use('/api/studentqualifications', studentQualificationsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
