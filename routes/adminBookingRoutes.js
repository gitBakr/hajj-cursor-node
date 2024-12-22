const express = require('express');
const router = express.Router();
const adminBookingController = require('../controllers/adminBookingController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Appliquer l'authentification pour toutes les routes admin
router.use(auth);
router.use(adminAuth);

// Routes administrateur pour les réservations
router.get('/', adminBookingController.getAllBookings);
router.get('/stats', adminBookingController.getBookingStats);
router.get('/:bookingId', adminBookingController.getBookingDetails);
router.patch('/:bookingId/status', adminBookingController.updateBookingStatus);

module.exports = router; 