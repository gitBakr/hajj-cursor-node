const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const checkAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const admin = await User.findOne({ email: 'admin11@example.com' });
        if (admin) {
            console.log('Admin found:', {
                email: admin.email,
                role: admin.role,
                firstName: admin.firstName,
                lastName: admin.lastName
            });
        } else {
            console.log('Admin not found');
        }
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkAdmin(); 