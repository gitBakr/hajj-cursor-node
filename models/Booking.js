const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    passportNumber: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    medicalNeeds: String,
    dietaryRestrictions: String
});

const bookingSchema = new mongoose.Schema({
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
    passengerDetails: [passengerSchema],
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    bookingNumber: { 
        type: Number,
        unique: true,
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    specialRequests: String,
    notes: String,
    createdAt: { type: Date, default: Date.now }
});

// Middleware pre-save pour générer le bookingNumber
bookingSchema.pre('save', async function(next) {
    try {
        if (!this.bookingNumber) {
            const lastBooking = await this.constructor.findOne({}).sort({ bookingNumber: -1 });
            this.bookingNumber = lastBooking ? (lastBooking.bookingNumber + 1) : 1000;
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Booking', bookingSchema); 