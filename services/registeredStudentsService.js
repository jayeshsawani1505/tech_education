const dbconnection = require('../config/database');
const fs = require('fs');
const xlsx = require('xlsx');

const parseExcelFileAndAddRecords = async (filePath, addStudentFunction) => {
    return new Promise(async (resolve, reject) => {
        try {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert Excel data to JSON
            const jsonData = xlsx.utils.sheet_to_json(sheet);

            // Validate if data exists
            if (jsonData.length === 0) {
                return reject(new Error("Excel file is empty or has invalid structure."));
            }

            // Add each record to the database
            for (const record of jsonData) {
                await addStudentFunction(record);
            }

            // Delete file after processing to save storage
            fs.unlink(filePath, (err) => {
                if (err) console.error("Error deleting file:", err);
            });

            resolve({ message: `${jsonData.length} records added successfully` });
        } catch (error) {
            reject(error);
        }
    });
};

// Add a new student
const addStudent = async (data) => {
    const {
        FormNo, CenRegNo, AdmissionDate, courseId, RoleId, BranchId, CertificateFees, RegFees, Surname, Name,
        SonOfDaughterOf, Email, BirthDate, Gender, Address, City, State, Pincode, MobileNumber, Password, StudentImage, CourseStartDate, CourseEndDate
    } = data;

    const query = `
        INSERT INTO registeredstudents 
        (FormNo, CenRegNo, AdmissionDate, CourseID, RoleId, BranchId, CertificateFees, RegFees, Surname, Name, SonOfDaughterOf, Email,
         BirthDate, Gender, Address, City, State, Pincode, MobileNumber, Password, 
         StudentImage, CourseStartDate, CourseEndDate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        FormNo, CenRegNo, AdmissionDate, courseId, RoleId, BranchId, CertificateFees, RegFees, Surname, Name,
        SonOfDaughterOf, Email, BirthDate, Gender, Address, City, State, Pincode, MobileNumber,
        Password, StudentImage, CourseStartDate, CourseEndDate
    ];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ StudentId: results.insertId });
        });
    });
};

const addUser = async (userData) => {
    const {
        FirstName, LastName, Email, PhoneNumber, Address, UserName, Password, RoleId, StudentId,
        BranchId, ProfilePicture
    } = userData;

    const query = `
        INSERT INTO users 
        (FirstName, LastName, Email, PhoneNumber, Address, UserName, Password, RoleId, StudentId, BranchId, ProfilePicture)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        FirstName, LastName, Email, PhoneNumber, Address, UserName, Password, RoleId, StudentId, BranchId, ProfilePicture
    ];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ UserID: results.insertId });
        });
    });
};

// Function to add a student and also add it to the users table
const addStudentAndUser = async (studentData) => {
    try {
        // Step 1: Add the student to the registeredstudents table
        const student = await addStudent(studentData);

        // Step 2: Add the student as a user to the users table
        const user = await addUser({
            FirstName: studentData.Name,
            LastName: studentData.Surname,
            Email: studentData.Email || "", // Optional email field
            PhoneNumber: studentData.MobileNumber,
            Address: studentData.Address,
            UserName: studentData.Name + studentData.Surname, // Assuming UserName
            Password: studentData.Password,
            RoleId: studentData.RoleId,
            StudentId: student.StudentId, // Use the returned StudentId
            BranchId: studentData.BranchId,
            ProfilePicture: studentData.StudentImage
        });

        return {
            success: true,
            message: 'Student and user added successfully',
            studentID: student.StudentId,
            userID: user.UserID
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error occurred while adding student or user',
            error: error.message
        };
    }
};

// Update a student by ID
const updateStudent = async (StudentId, data) => {
    const { FormNo, CenRegNo, AdmissionDate, CourseID, RoleId, BranchId, CertificateFees, RegFees, Surname, Name,
        SonOfDaughterOf, Email, BirthDate, Gender, Address, City, State, Pincode, MobileNumber, CourseStartDate, CourseEndDate } = data;

    const query = `UPDATE registeredstudents SET FormNo = ?, CenRegNo = ?, AdmissionDate = ?, CourseID = ?, 
                   RoleId = ?, BranchId = ?, CertificateFees = ?, RegFees = ?, Surname = ?, Name = ?, SonOfDaughterOf = ?, Email = ?,
                   BirthDate = ?, Gender = ?, Address = ?, City = ?, State = ?, Pincode = ?, MobileNumber = ?, CourseStartDate = ?, CourseEndDate = ?
                   WHERE StudentId = ?`;

    const values = [FormNo, CenRegNo, AdmissionDate, CourseID, RoleId, BranchId, CertificateFees, RegFees, Surname, Name,
        SonOfDaughterOf, Email, BirthDate, Gender, Address, City, State, Pincode, MobileNumber, CourseStartDate, CourseEndDate, StudentId];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Delete a student by ID
const deleteStudent = async (StudentId) => {
    const deleteUserQuery = `DELETE FROM users WHERE StudentId = ?`;
    const deleteRegisteredStudentQuery = `DELETE FROM registeredstudents WHERE StudentId = ?`;
    const deleteStudentQualificationQuery = `DELETE FROM studentqualifications WHERE StudentId = ?`;

    return new Promise((resolve, reject) => {
        // Start a transaction
        dbconnection.beginTransaction((error) => {
            if (error) {
                return reject(error);
            }

            // First, delete from studentqualifications table
            dbconnection.query(deleteStudentQualificationQuery, [StudentId], (error, qualificationResults) => {
                if (error) {
                    return dbconnection.rollback(() => {
                        reject(error);
                    });
                }

                // Then, delete from registeredstudents table
                dbconnection.query(deleteRegisteredStudentQuery, [StudentId], (error, registeredStudentResults) => {
                    if (error) {
                        return dbconnection.rollback(() => {
                            reject(error);
                        });
                    }

                    // Finally, delete from users table
                    dbconnection.query(deleteUserQuery, [StudentId], (error, userResults) => {
                        if (error) {
                            return dbconnection.rollback(() => {
                                reject(error);
                            });
                        }

                        // Commit the transaction if all deletions were successful
                        dbconnection.commit((error) => {
                            if (error) {
                                return dbconnection.rollback(() => {
                                    reject(error);
                                });
                            }
                            resolve({
                                message: 'Student deleted successfully',
                                affectedRows: qualificationResults.affectedRows + registeredStudentResults.affectedRows + userResults.affectedRows,
                            });
                        });
                    });
                });
            });
        });
    });
};

// Get a student by ID
const getStudentById = async (StudentId) => {
    const query = `SELECT 
            s.*,
            b.BranchName,
            c.CourseName
        FROM 
            registeredstudents s
        JOIN 
            branch b ON s.BranchId = b.BranchId
        JOIN 
            course c ON s.CourseID = c.CourseId
             WHERE s.StudentId = ?`;

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [StudentId], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

// Get all students
const getAllStudents = async () => {
    const query = `
        SELECT 
            s.*,
            b.BranchName,
            c.CourseName
        FROM 
            registeredstudents s
        JOIN 
            branch b ON s.BranchId = b.BranchId
        JOIN 
            course c ON s.CourseID = c.CourseId;
    `;

    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Get students by BranchID
const getStudentsByBranch = async (branchID) => {
    const query = `SELECT 
            s.*,
            b.BranchName,
            c.CourseName
        FROM 
            registeredstudents s
        JOIN 
            branch b ON s.BranchId = b.BranchId
        JOIN 
            course c ON s.CourseID = c.CourseId
             WHERE s.BranchId = ?`;

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [branchID], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

const registrationService = async () => {
    return new Promise((resolve, reject) => {
        // Query to get the maximum StudentId from the registeredstudents table
        dbconnection.query('SELECT MAX(StudentId) AS last_student_id FROM registeredstudents', (error, results) => {
            if (error) {
                console.error('Database Query Error:', error); // Log query error
                return reject(new Error('Failed to query the database'));
            }

            // Check if results are empty or invalid
            if (!results || results.length === 0 || results[0].last_student_id === null) {
                return reject(new Error("No students found in the database"));
            }

            // Get the last StudentId and generate the new ID
            const lastStudentId = results[0].last_student_id;
            let newStudentId = lastStudentId + 1; // Increment the last student ID

            // Generate FormNo and CenRegNo based on the new StudentId
            let newFormNo = `FORM-${String(newStudentId).padStart(4, '0')}`; // Example: FORM-1001
            let newCenRegNo = `CENREG-${String(newStudentId).padStart(4, '0')}`; // Example: CENREG-1001

            console.log('Generated FormNo:', newFormNo); // Log generated FormNo
            console.log('Generated CenRegNo:', newCenRegNo); // Log generated CenRegNo

            // Resolve with the generated values
            resolve({
                form_no: newFormNo,
                cen_reg_no: newCenRegNo
            });
        });
    });
};

module.exports = {
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
    getAllStudents,
    getStudentsByBranch,
    addStudentAndUser,
    parseExcelFileAndAddRecords,
    registrationService
};
