// services/youtubebannerService.js
const dbconnection = require('../config/database');

// Add a new banner
const addBanner = async (bannerData) => {
    const { Url } = bannerData;
    const query = 'INSERT INTO youtubebanner (Url) VALUES (?)';
    return new Promise((resolve, reject) => {
        dbconnection.query(query, [Url], (error, results) => {
            if (error) return reject(error);
            resolve({ BannerId: results.insertId });
        });
    });
};

// Get all banners
const getAllBanners = async () => {
    const query = 'SELECT * FROM youtubebanner';
    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Get a banner by ID
const getBannerById = async (BannerId) => {
    const query = 'SELECT * FROM youtubebanner WHERE BannerId = ?';
    return new Promise((resolve, reject) => {
        dbconnection.query(query, [BannerId], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

// Update a banner by ID
const updateBanner = async (BannerId, bannerData) => {
    const { Url } = bannerData;
    const query = 'UPDATE youtubebanner SET Url = ? WHERE BannerId = ?';
    return new Promise((resolve, reject) => {
        dbconnection.query(query, [Url, BannerId], (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Delete a banner by ID
const deleteBanner = async (BannerId) => {
    const query = 'DELETE FROM youtubebanner WHERE BannerId = ?';
    return new Promise((resolve, reject) => {
        dbconnection.query(query, [BannerId], (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

module.exports = {
    addBanner,
    getAllBanners,
    getBannerById,
    updateBanner,
    deleteBanner,
};
