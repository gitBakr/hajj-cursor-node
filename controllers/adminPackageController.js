const Package = require('../models/Package');

const adminPackageController = {
  // Créer un nouveau package
  createPackage: async (req, res) => {
    try {
      const {
        type,
        title,
        description,
        duration,
        startDate,
        endDate,
        price,
        capacity,
        includes,
        itinerary
      } = req.body;

      const package = new Package({
        type,
        title,
        description,
        duration,
        startDate,
        endDate,
        price,
        capacity,
        remainingSpots: capacity,
        includes,
        itinerary
      });

      await package.save();
      res.status(201).json({ message: 'Package créé avec succès', package });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création du package', error: error.message });
    }
  },

  // Mettre à jour un package
  updatePackage: async (req, res) => {
    try {
      const { packageId } = req.params;
      const updateData = req.body;

      // Empêcher la modification directe des places restantes
      if (updateData.remainingSpots !== undefined) {
        delete updateData.remainingSpots;
      }

      // Si la capacité est mise à jour, ajuster les places restantes
      if (updateData.capacity !== undefined) {
        const currentPackage = await Package.findById(packageId);
        const spotsBooked = currentPackage.capacity - currentPackage.remainingSpots;
        updateData.remainingSpots = Math.max(0, updateData.capacity - spotsBooked);
      }

      const package = await Package.findByIdAndUpdate(
        packageId,
        updateData,
        { new: true, runValidators: true }
      );

      if (!package) {
        return res.status(404).json({ message: 'Package non trouvé' });
      }

      res.json({ message: 'Package mis à jour avec succès', package });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour du package', error: error.message });
    }
  },

  // Supprimer un package
  deletePackage: async (req, res) => {
    try {
      const { packageId } = req.params;

      const package = await Package.findById(packageId);
      if (!package) {
        return res.status(404).json({ message: 'Package non trouvé' });
      }

      // Vérifier s'il y a des réservations actives
      if (package.remainingSpots < package.capacity) {
        return res.status(400).json({ 
          message: 'Impossible de supprimer un package avec des réservations actives' 
        });
      }

      await Package.findByIdAndDelete(packageId);
      res.json({ message: 'Package supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression du package' });
    }
  },

  // Obtenir tous les packages (incluant inactifs)
  getAllPackages: async (req, res) => {
    try {
      const { status, page = 1, limit = 10 } = req.query;
      const query = status ? { status } : {};

      const packages = await Package.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await Package.countDocuments(query);

      res.json({
        packages,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total
      });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des packages' });
    }
  },

  // Mettre à jour le statut d'un package
  updatePackageStatus: async (req, res) => {
    try {
      const { packageId } = req.params;
      const { status } = req.body;

      const package = await Package.findByIdAndUpdate(
        packageId,
        { status },
        { new: true }
      );

      if (!package) {
        return res.status(404).json({ message: 'Package non trouvé' });
      }

      res.json({ message: 'Statut mis à jour avec succès', package });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour du statut' });
    }
  }
};

module.exports = adminPackageController; 