const mongoose = require('mongoose');
const User = require('../models/User');
const Package = require('../models/Package');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connecté à MongoDB');

    // Nettoyer les collections existantes
    await User.deleteMany({});
    await Package.deleteMany({});

    // Créer un admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      firstName: 'Admin',
      lastName: 'System',
      email: 'admin@example.com',
      password: hashedPassword,
      phoneNumber: '+33123456789',
      role: 'admin'
    });
    await admin.save();

    // Créer quelques packages
    const packages = [
      {
        type: 'omra',
        title: 'Omra Ramadan 2024',
        description: 'Voyage spirituel pendant le mois sacré de Ramadan',
        duration: 15,
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-03-30'),
        price: 2500,
        capacity: 50,
        remainingSpots: 50,
        includes: [
          'Vol aller-retour',
          'Hébergement 4*',
          'Transferts',
          'Guide spirituel'
        ],
        itinerary: [
          { day: 1, description: 'Arrivée à Médine' },
          { day: 2, description: 'Visite de la Mosquée du Prophète' }
        ],
        status: 'active'
      },
      {
        type: 'hajj',
        title: 'Hajj 2024',
        description: 'Pèlerinage annuel à La Mecque',
        duration: 21,
        startDate: new Date('2024-06-15'),
        endDate: new Date('2024-07-06'),
        price: 6500,
        capacity: 30,
        remainingSpots: 30,
        includes: [
          'Vol aller-retour',
          'Hébergement 5*',
          'Transferts',
          'Guide expérimenté',
          'Pension complète'
        ],
        itinerary: [
          { day: 1, description: 'Arrivée à Djeddah' },
          { day: 2, description: 'Transport vers La Mecque' }
        ],
        status: 'active'
      }
    ];

    await Package.insertMany(packages);

    console.log('Base de données initialisée avec succès');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
};

seedDatabase(); 