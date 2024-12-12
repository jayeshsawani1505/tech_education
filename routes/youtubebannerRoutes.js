// routes/youtubebannerRoutes.js
const express = require('express');
const router = express.Router();
const youtubebannerController = require('../controllers/youtubebannerController');

// Routes for YouTube banner management
router.post('/', youtubebannerController.addBanner);          // Add a new banner
router.get('/', youtubebannerController.getAllBanners);      // Get all banners
router.get('/:id', youtubebannerController.getBannerById);   // Get a banner by ID
router.put('/:id', youtubebannerController.updateBanner);    // Update a banner by ID
router.delete('/:id', youtubebannerController.deleteBanner); // Delete a banner by ID

module.exports = router;
