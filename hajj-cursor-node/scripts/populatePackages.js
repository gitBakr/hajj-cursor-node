const mongoose = require('mongoose');
const Package = require('../models/Package');
require('dotenv').config();

const packages = [
    // Omra mensuelle 2024
    {
        type: 'omra',
        title: 'Omra Janvier 2024',
        description: 'Omra du mois de Janvier avec séjour dans des hôtels 5 étoiles',
        duration: 12,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-27'),
        price: 2900,
        capacity: 40,
        remainingSpots: 40,
        includes: [
            'Vol direct aller-retour',
            'Hôtel 5* à Médine',
            'Hôtel 5* à La Mecque',
            'Transferts privés',
            'Guide francophone',
            'Pension complète'
        ],
        itinerary: [
            { day: 1, description: 'Départ de Paris CDG' },
            { day: 2, description: 'Arrivée à Médine et installation' },
            { day: 3, description: 'Visite des lieux saints de Médine' },
            { day: 4, description: 'Départ pour La Mecque' }
        ],
        status: 'active'
    },
    {
        type: 'omra',
        title: 'Omra Février 2024',
        description: 'Omra du mois de Février avec programme spécial famille',
        duration: 10,
        startDate: new Date('2024-02-10'),
        endDate: new Date('2024-02-20'),
        price: 2700,
        capacity: 45,
        remainingSpots: 45,
        includes: [
            'Vol aller-retour',
            'Hôtels 4*',
            'Transferts',
            'Guide francophone',
            'Demi-pension'
        ],
        itinerary: [
            { day: 1, description: 'Départ de Paris' },
            { day: 2, description: 'Arrivée à Médine' }
        ],
        status: 'active'
    },
    // ... autres mois similaires

    // Omra Ramadan 2024 (prix plus élevé)
    {
        type: 'omra',
        title: 'Omra Ramadan 2024',
        description: 'Omra spéciale pendant le mois sacré de Ramadan',
        duration: 15,
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-03-30'),
        price: 3500,
        capacity: 30,
        remainingSpots: 30,
        includes: [
            'Vol direct aller-retour',
            'Hôtels 5* vue sur Haram',
            'Transferts VIP',
            'Guide expérimenté',
            'Pension complète spéciale Ramadan'
        ],
        itinerary: [
            { day: 1, description: 'Départ de Paris' },
            { day: 2, description: 'Arrivée à Médine' }
        ],
        status: 'active'
    },

    // Hajj 2024 et 2025
    {
        type: 'hajj',
        title: 'Hajj 2024 Premium',
        description: 'Programme Hajj tout compris avec services premium',
        duration: 21,
        startDate: new Date('2024-06-15'),
        endDate: new Date('2024-07-06'),
        price: 8500,
        capacity: 25,
        remainingSpots: 25,
        includes: [
            'Vol direct aller-retour',
            'Hôtels 5* premium',
            'Tentes VIP à Mina',
            'Transferts privés',
            'Guide expert',
            'Pension complète',
            'Kit du pèlerin'
        ],
        itinerary: [
            { day: 1, description: 'Départ de Paris' },
            { day: 2, description: 'Arrivée à Médine' },
            { day: 3, description: 'Visite des lieux saints de Médine' }
        ],
        status: 'active'
    },
    {
        type: 'hajj',
        title: 'Hajj 2025 Confort',
        description: 'Programme Hajj avec un excellent rapport qualité-prix',
        duration: 18,
        startDate: new Date('2025-06-01'),
        endDate: new Date('2025-06-19'),
        price: 7500,
        capacity: 35,
        remainingSpots: 35,
        includes: [
            'Vol aller-retour',
            'Hôtels 4*',
            'Tentes confortables à Mina',
            'Transferts',
            'Guide francophone',
            'Pension complète'
        ],
        itinerary: [
            { day: 1, description: 'Départ de Paris' },
            { day: 2, description: 'Arrivée à Djeddah' }
        ],
        status: 'active'
    }
];

const populatePackages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Supprimer les packages existants
        await Package.deleteMany({});
        console.log('Existing packages deleted');

        // Insérer les nouveaux packages
        await Package.insertMany(packages);
        console.log('New packages inserted successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

populatePackages(); 