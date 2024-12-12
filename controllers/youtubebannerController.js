// controllers/youtubebannerController.js
const youtubebannerService = require('../services/youtubebannerService');

// Add a new banner
const addBanner = async (req, res) => {
    try {
        const bannerData = req.body;
        const result = await youtubebannerService.addBanner(bannerData);
        res.status(201).json({ message: "Banner added successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all banners
const getAllBanners = async (req, res) => {
    try {
        const banners = await youtubebannerService.getAllBanners();
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a banner by ID
const getBannerById = async (req, res) => {
    try {
        const BannerId = req.params.id;
        const banner = await youtubebannerService.getBannerById(BannerId);
        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a banner by ID
const updateBanner = async (req, res) => {
    try {
        const BannerId = req.params.id;
        const bannerData = req.body;
        const result = await youtubebannerService.updateBanner(BannerId, bannerData);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Banner not found" });
        }
        res.status(200).json({ message: "Banner updated successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a banner by ID
const deleteBanner = async (req, res) => {
    try {
        const BannerId = req.params.id;
        const result = await youtubebannerService.deleteBanner(BannerId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Banner not found" });
        }
        res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addBanner,
    getAllBanners,
    getBannerById,
    updateBanner,
    deleteBanner,
};
