const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Routes publiques (sans aucune authentification)
router.post('/create', bookingController.createBooking);  // Route publique
router.post('/verify', bookingController.getBookingByNumber);

// Routes qui nécessitent une authentification
const protectedRouter = express.Router();
protectedRouter.use(auth);
protectedRouter.get('/user-bookings', bookingController.getUserBookings);

// Routes admin
const adminRouter = express.Router();
adminRouter.use(auth, adminAuth);
adminRouter.get('/all', bookingController.getAllBookings);
adminRouter.patch('/:bookingId/status', bookingController.updateBookingStatus);

// Appliquer les routes protégées et admin
router.use(protectedRouter);
router.use(adminRouter);

module.exports = router; 