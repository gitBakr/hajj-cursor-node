const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

// Routes publiques pour les packages
router.get('/', packageController.getAllActivePackages);
router.get('/search', packageController.searchPackages);
router.get('/upcoming', packageController.getUpcomingDepartures);
router.get('/:packageId', packageController.getPackageDetails);

module.exports = router; 