const dbconnection = require('../config/database');

// Add new user
const addUser = async (userData) => {
    const { FirstName, LastName, Email, PhoneNumber, Address, UserName, Password, RoleId, CreatedBy, BranchId, ProfilePicture } = userData;
    const query = 'INSERT INTO users (FirstName, LastName, Email, PhoneNumber, Address, UserName, Password, RoleId, CreatedBy, BranchId, ProfilePicture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [FirstName, LastName, Email, PhoneNumber, Address, UserName, Password, RoleId, CreatedBy, BranchId, ProfilePicture];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ UserID: results.insertId });
        });
    });
};

// Get user by ID
const getUserById = async (UserID) => {
    const query = 'SELECT * FROM users WHERE UserID = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [UserID], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

// Get all users
const getAllUsers = async () => {
    const query = 'SELECT * FROM users WHERE IsDeleted = 0';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Update user by ID
const updateUser = async (UserID, userData) => {
    const { FirstName, LastName, Email, PhoneNumber, Address, UserName, Password, RoleId, ModifiedBy, BranchId, ProfilePicture, IsActive } = userData;
    const query = 'UPDATE users SET FirstName = ?, LastName = ?, Email = ?, PhoneNumber = ?, Address = ?, UserName = ?, Password = ?, RoleId = ?, ModifiedBy = ?, BranchId = ?, ProfilePicture = ?, IsActive = ? WHERE UserID = ?';
    const values = [FirstName, LastName, Email, PhoneNumber, Address, UserName, Password, RoleId, ModifiedBy, BranchId, ProfilePicture, IsActive, UserID];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Delete user by ID (soft delete by updating IsDeleted field)
const deleteUser = async (UserID) => {
    const query = 'UPDATE users SET IsDeleted = 1 WHERE UserID = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [UserID], (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

module.exports = {
    addUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
};
