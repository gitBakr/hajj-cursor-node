const Booking = require('../models/Booking');
const Package = require('../models/Package');
const User = require('../models/User');

const adminBookingController = {
  // Obtenir toutes les réservations avec filtres
  getAllBookings: async (req, res) => {
    try {
      const { 
        status, 
        startDate, 
        endDate, 
        packageType,
        page = 1, 
        limit = 10 
      } = req.query;

      let query = {};

      // Filtres
      if (status) query.status = status;
      if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) query.createdAt.$gte = new Date(startDate);
        if (endDate) query.createdAt.$lte = new Date(endDate);
      }

      // Joindre les informations du package et de l'utilisateur
      const bookings = await Booking.find(query)
        .populate('packageId')
        .populate('userId', 'firstName lastName email phoneNumber')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      // Filtrer par type de package si spécifié
      if (packageType) {
        bookings = bookings.filter(booking => 
          booking.packageId && booking.packageId.type === packageType
        );
      }

      const total = await Booking.countDocuments(query);

      res.json({
        bookings,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Erreur lors de la récupération des réservations',
        error: error.message 
      });
    }
  },

  // Obtenir les détails d'une réservation spécifique
  getBookingDetails: async (req, res) => {
    try {
      const { bookingId } = req.params;

      const booking = await Booking.findById(bookingId)
        .populate('packageId')
        .populate('userId', 'firstName lastName email phoneNumber');

      if (!booking) {
        return res.status(404).json({ message: 'Réservation non trouvée' });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ 
        message: 'Erreur lors de la récupération des détails de la réservation' 
      });
    }
  },

  // Mettre à jour le statut d'une réservation
  updateBookingStatus: async (req, res) => {
    try {
      const { bookingId } = req.params;
      const { status, note } = req.body;

      const booking = await Booking.findById(bookingId).populate('packageId');
      if (!booking) {
        return res.status(404).json({ message: 'Réservation non trouvée' });
      }

      // Gérer les places disponibles selon le changement de statut
      if (status === 'cancelled' && booking.status !== 'cancelled') {
        // Libérer les places si la réservation est annulée
        const package = await Package.findById(booking.packageId);
        package.remainingSpots += booking.passengerDetails.length;
        await package.save();
      } else if (booking.status === 'cancelled' && status !== 'cancelled') {
        // Réserver les places si la réservation est réactivée
        const package = await Package.findById(booking.packageId);
        if (package.remainingSpots < booking.passengerDetails.length) {
          return res.status(400).json({ 
            message: 'Places insuffisantes pour réactiver la réservation' 
          });
        }
        package.remainingSpots -= booking.passengerDetails.length;
        await package.save();
      }

      booking.status = status;
      if (note) booking.adminNotes = note;
      await booking.save();

      res.json({ message: 'Statut de la réservation mis à jour', booking });
    } catch (error) {
      res.status(500).json({ 
        message: 'Erreur lors de la mise à jour du statut',
        error: error.message 
      });
    }
  },

  // Obtenir des statistiques sur les réservations
  getBookingStats: async (req, res) => {
    try {
      const stats = await Booking.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalRevenue: { $sum: '$totalPrice' }
          }
        }
      ]);

      const packageStats = await Booking.aggregate([
        {
          $lookup: {
            from: 'packages',
            localField: 'packageId',
            foreignField: '_id',
            as: 'package'
          }
        },
        {
          $unwind: '$package'
        },
        {
          $group: {
            _id: '$package.type',
            count: { $sum: 1 },
            revenue: { $sum: '$totalPrice' }
          }
        }
      ]);

      res.json({
        statusStats: stats,
        packageTypeStats: packageStats
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Erreur lors de la récupération des statistiques',
        error: error.message 
      });
    }
  }
};

module.exports = adminBookingController; 