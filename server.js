const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const packageRoutes = require('./routes/packageRoutes');
const adminPackageRoutes = require('./routes/adminPackageRoutes');
const adminBookingRoutes = require('./routes/adminBookingRoutes');
const cors = require('cors');

dotenv.config();
const app = express();

// Connexion à MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/admin/packages', adminPackageRoutes);
app.use('/api/admin/bookings', adminBookingRoutes);

// Route de test
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 