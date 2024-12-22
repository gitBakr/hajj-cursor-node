const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['hajj', 'omra'], 
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // en jours
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  remainingSpots: { type: Number },
  includes: [String],
  itinerary: [{
    day: Number,
    description: String
  }],
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'completed'],
    default: 'active'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Package', packageSchema); 