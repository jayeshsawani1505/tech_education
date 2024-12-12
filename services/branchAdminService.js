const dbconnection = require('../config/database');

// Add a new branch admin
const addBranchAdmin = async (adminData) => {
    const {
        FirstName, LastName, PhoneNumber, Address, Email, Image,
        UserName, Password, BranchID, RoleId
    } = adminData;

    const query = `
        INSERT INTO branchadmin 
        (FirstName, LastName, PhoneNumber, Address, Email, Image, UserName, Password, BranchID, RoleId) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [FirstName, LastName, PhoneNumber, Address, Email, Image, UserName, Password, BranchID, RoleId];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ BranchAdminID: results.insertId });
        });
    });
};

const addUser = async (adminData) => {
    const {
        FirstName, LastName, Email, PhoneNumber, Address, UserName, Password,
        RoleId, BranchId, ProfilePicture
    } = adminData;

    const query = `
        INSERT INTO users 
        (FirstName, LastName, Email, PhoneNumber, Address, UserName, Password, RoleId, BranchId, ProfilePicture) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [FirstName, LastName, Email, PhoneNumber, Address, UserName, Password, RoleId, BranchId, ProfilePicture];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ UserID: results.insertId });
        });
    });
};

// Function to add a Branch Admin and also add it to Users
const addBranchAdminAndUser = async (adminData) => {
    try {
        // Step 1: Add the admin to the branchadmin table
        const branchAdmin = await addBranchAdmin(adminData);

        // Step 2: Add the same admin to the users table if branchadmin is added successfully
        const user = await addUser({
            ...adminData,
            BranchId: branchAdmin.BranchAdminID, // Map BranchID to BranchId for users table
            ProfilePicture: adminData.Image // Map Image to ProfilePicture for users table
        });

        return {
            success: true,
            message: 'Branch admin and user added successfully',
            branchAdminID: branchAdmin.BranchAdminID,
            userID: user.UserID
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error occurred while adding branch admin or user',
            error: error.message
        };
    }
};

// Update a branch admin by ID
const updateBranchAdmin = async (BranchAdminID, adminData) => {
    const { FirstName, LastName, PhoneNumber, Address, Email, Image, UserName, Password, BranchID, RoleId } = adminData;
    console.log("Updating branch admin with the following data:", adminData);
    const imagePath = Image && typeof Image === 'object' ? JSON.stringify(Image) : Image;

    const query = `
        UPDATE branchadmin 
        SET FirstName = ?, LastName = ?, PhoneNumber = ?, Address = ?, Email = ?, Image = ?, 
            UserName = ?, Password = ?, BranchID = ?, RoleId = ?
        WHERE BranchAdminID = ?`;

    const values = [FirstName, LastName, PhoneNumber, Address, Email, imagePath, UserName, Password, BranchID, RoleId, BranchAdminID];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) {
                console.error("SQL Error: ", error);
                return reject(error);
            }
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Delete a branch admin by ID
const deleteBranchAdmin = async (BranchAdminID) => {
    const deleteUsersQuery = `DELETE FROM users WHERE BranchId = ?`;
    const deleteBranchAdminQuery = `DELETE FROM branchadmin WHERE BranchAdminID = ?`;

    return new Promise((resolve, reject) => {
        // Start a transaction
        dbconnection.beginTransaction((error) => {
            if (error) return reject(error);

            // First delete from users table
            dbconnection.query(deleteUsersQuery, [BranchAdminID], (error, userResults) => {
                if (error) {
                    return dbconnection.rollback(() => {
                        reject(error);
                    });
                }

                // Then delete from branchadmin table
                dbconnection.query(deleteBranchAdminQuery, [BranchAdminID], (error, branchAdminResults) => {
                    if (error) {
                        return dbconnection.rollback(() => {
                            reject(error);
                        });
                    }

                    // Commit the transaction if both deletions were successful
                    dbconnection.commit((error) => {
                        if (error) {
                            return dbconnection.rollback(() => {
                                reject(error);
                            });
                        }
                        resolve({ affectedRows: userResults.affectedRows + branchAdminResults.affectedRows });
                    });
                });
            });
        });
    });
};

// Get a branch admin by ID
const getBranchAdminById = async (BranchAdminID) => {
    const query = 'SELECT * FROM branchadmin WHERE BranchAdminID = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [BranchAdminID], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

// Get all branch admins
const getAllBranchAdmins = async () => {
    const query = `
        SELECT branchadmin.*, branch.BranchName 
        FROM branchadmin
        JOIN branch ON branchadmin.branchID = branch.branchId
    `;

    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};


module.exports = {
    addBranchAdmin,
    updateBranchAdmin,
    deleteBranchAdmin,
    getBranchAdminById,
    getAllBranchAdmins, // Add this to the exports,
    addBranchAdminAndUser
};
