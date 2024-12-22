const express = require('express');
const router = express.Router();
const adminPackageController = require('../controllers/adminPackageController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Appliquer l'authentification pour toutes les routes admin
router.use(auth);
router.use(adminAuth);

// Routes administrateur pour les packages
router.post('/', adminPackageController.createPackage);
router.get('/all', adminPackageController.getAllPackages);
router.put('/:packageId', adminPackageController.updatePackage);
router.delete('/:packageId', adminPackageController.deletePackage);
router.patch('/:packageId/status', adminPackageController.updatePackageStatus);

module.exports = router; 