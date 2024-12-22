const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Routes publiques
router.post('/verify', bookingController.getBookingByNumber);

// Routes authentifiées
router.use(auth);
router.post('/create', bookingController.createBooking);
router.get('/user-bookings', bookingController.getUserBookings);

// Routes admin
router.use(adminAuth);
router.get('/all', bookingController.getAllBookings);
router.patch('/:bookingId/status', bookingController.updateBookingStatus);

module.exports = router; 