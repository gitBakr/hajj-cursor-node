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
        sparse: true
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

// Créer l'index après avoir permis les valeurs null
bookingSchema.index({ bookingNumber: 1 }, { unique: true, sparse: true });

// Middleware pre-save pour générer le bookingNumber
bookingSchema.pre('save', async function(next) {
    try {
        if (!this.bookingNumber) {
            let isUnique = false;
            let newBookingNumber;
            
            while (!isUnique) {
                // Trouver le plus grand numéro existant
                const lastBooking = await this.constructor.findOne({ 
                    bookingNumber: { $exists: true } 
                }).sort({ bookingNumber: -1 });
                
                // Générer un nouveau numéro
                newBookingNumber = lastBooking ? (lastBooking.bookingNumber + 1) : 1000;
                
                // Vérifier s'il est unique
                const existingBooking = await this.constructor.findOne({ 
                    bookingNumber: newBookingNumber 
                });
                
                if (!existingBooking) {
                    isUnique = true;
                }
            }
            
            this.bookingNumber = newBookingNumber;
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Booking', bookingSchema); 