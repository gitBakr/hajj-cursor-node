const Package = require('../models/Package');

const packageController = {
  // Obtenir tous les packages actifs (publique)
  getAllActivePackages: async (req, res) => {
    try {
      const { type, startDate, endDate, page = 1, limit = 10 } = req.query;
      
      // Construction de la requête
      let query = { status: 'active' };
      
      if (type) {
        query.type = type;
      }
      
      if (startDate || endDate) {
        query.startDate = {};
        if (startDate) query.startDate.$gte = new Date(startDate);
        if (endDate) query.startDate.$lte = new Date(endDate);
      }

      const packages = await Package.find(query)
        .select('-createdAt -__v')
        .sort({ startDate: 1 })
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

  // Obtenir les détails d'un package spécifique (publique)
  getPackageDetails: async (req, res) => {
    try {
      const { packageId } = req.params;
      
      const package = await Package.findOne({
        _id: packageId,
        status: 'active'
      }).select('-createdAt -__v');

      if (!package) {
        return res.status(404).json({ message: 'Package non trouvé' });
      }

      res.json(package);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération du package' });
    }
  },

  // Rechercher des packages (publique)
  searchPackages: async (req, res) => {
    try {
      const { 
        query, 
        type, 
        minPrice, 
        maxPrice, 
        minDuration, 
        maxDuration,
        page = 1,
        limit = 10
      } = req.query;

      let searchQuery = { status: 'active' };

      // Recherche textuelle
      if (query) {
        searchQuery.$or = [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ];
      }

      // Filtres
      if (type) searchQuery.type = type;
      if (minPrice || maxPrice) {
        searchQuery.price = {};
        if (minPrice) searchQuery.price.$gte = parseInt(minPrice);
        if (maxPrice) searchQuery.price.$lte = parseInt(maxPrice);
      }
      if (minDuration || maxDuration) {
        searchQuery.duration = {};
        if (minDuration) searchQuery.duration.$gte = parseInt(minDuration);
        if (maxDuration) searchQuery.duration.$lte = parseInt(maxDuration);
      }

      const packages = await Package.find(searchQuery)
        .select('-createdAt -__v')
        .sort({ startDate: 1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await Package.countDocuments(searchQuery);

      res.json({
        packages,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total
      });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la recherche des packages' });
    }
  },

  // Obtenir les prochains départs (publique)
  getUpcomingDepartures: async (req, res) => {
    try {
      const { limit = 5 } = req.query;
      const now = new Date();

      const packages = await Package.find({
        status: 'active',
        startDate: { $gt: now }
      })
        .select('title type startDate price remainingSpots')
        .sort({ startDate: 1 })
        .limit(parseInt(limit));

      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des prochains départs' });
    }
  }
};

module.exports = packageController; 