const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Vérifier si l'admin existe déjà
        const existingAdmin = await User.findOne({ email: 'admin11@example.com' });
        
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        const adminUser = new User({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin11@example.com',
            password: hashedPassword,
            phoneNumber: '+33600000000',
            role: 'admin'
        });

        await adminUser.save();
        console.log('Admin user created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createAdmin(); 