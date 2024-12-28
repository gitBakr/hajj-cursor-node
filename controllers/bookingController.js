const Booking = require('../models/Booking');
const Package = require('../models/Package');

const bookingController = {
  // Créer une nouvelle réservation
  createBooking: async (req, res) => {
    try {
      const {
        packageId,
        passengerDetails,
        contactEmail,
        contactPhone,
        totalPrice
      } = req.body;

      // Vérifier si le package existe
      const package = await Package.findById(packageId);
      if (!package) {
        return res.status(404).json({ message: 'Package non trouvé' });
      }

      // Créer la réservation
      const booking = new Booking({
        packageId,
        passengerDetails,
        contactEmail,
        contactPhone,
        totalPrice,
        userId: req.user ? req.user.userId : null,
        status: 'pending'
      });

      await booking.save();

      res.status(201).json({ 
        message: 'Réservation créée avec succès',
        bookingNumber: booking.bookingNumber,
        booking 
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Erreur lors de la création de la réservation',
        error: error.message 
      });
    }
  },

  // Obtenir une réservation par numéro
  getBookingByNumber: async (req, res) => {
    try {
      const { bookingNumber, email } = req.body;

      const booking = await Booking.findOne({ 
        bookingNumber: parseInt(bookingNumber),
        contactEmail: email 
      }).populate('packageId');

      if (!booking) {
        return res.status(404).json({ message: 'Réservation non trouvée' });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ 
        message: 'Erreur lors de la recherche de la réservation',
        error: error.message 
      });
    }
  },

  // Mettre à jour le statut d'une réservation (admin)
  updateBookingStatus: async (req, res) => {
    try {
      const { bookingId } = req.params;
      const { status } = req.body;

      const booking = await Booking.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ message: 'Réservation non trouvée' });
      }

      booking.status = status;
      await booking.save();

      res.json({ message: 'Statut mis à jour', booking });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour du statut' });
    }
  },

  // Obtenir toutes les réservations d'un utilisateur
  getUserBookings: async (req, res) => {
    try {
      const bookings = await Booking.find({ userId: req.user.userId })
        .populate('packageId')
        .sort({ createdAt: -1 });

      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des réservations' });
    }
  },

  // Liste toutes les réservations (admin)
  getAllBookings: async (req, res) => {
    try {
      const { status, page = 1, limit = 10 } = req.query;
      const query = status ? { status } : {};

      const bookings = await Booking.find(query)
        .populate('packageId')
        .populate('userId', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await Booking.countDocuments(query);

      res.json({
        bookings,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des réservations' });
    }
  }
};

module.exports = bookingController; 