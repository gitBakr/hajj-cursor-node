const mongoose = require('mongoose');
const Package = require('../models/Package');
require('dotenv').config();

const packages = [
    // Omras mensuelles 2024
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
        description: 'Omra spéciale vacances scolaires',
        duration: 10,
        startDate: new Date('2024-02-10'),
        endDate: new Date('2024-02-20'),
        price: 2700,
        capacity: 45,
        remainingSpots: 45,
        includes: [
            'Vol direct aller-retour',
            'Hôtel 4* à Médine',
            'Hôtel 4* à La Mecque',
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
            'Pension complète spéciale Ramadan',
            'Programme spirituel renforcé'
        ],
        itinerary: [
            { day: 1, description: 'Départ de Paris' },
            { day: 2, description: 'Arrivée à La Mecque' },
            { day: 3, description: 'Programme spirituel spécial Ramadan' }
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
            'Kit du pèlerin',
            'Assistance médicale'
        ],
        itinerary: [
            { day: 1, description: 'Départ de Paris' },
            { day: 2, description: 'Arrivée à Médine' },
            { day: 3, description: 'Visite des lieux saints de Médine' }
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
