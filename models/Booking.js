const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingNumber: { 
    type: Number,
    required: true,
    unique: true,
    min: 100,
    max: 999
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: false
  },
  packageId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Package', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  passengerDetails: [{
    firstName: String,
    lastName: String,
    passportNumber: String,
    dateOfBirth: Date
  }],
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema); 