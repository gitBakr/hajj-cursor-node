const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authController = {
   register: async (req, res) => {
       try {
           const { firstName, lastName, email, password, phoneNumber } = req.body;
           const hashedPassword = await bcrypt.hash(password, 10);
           
           const user = new User({
               firstName,
               lastName,
               email,
               password: hashedPassword,
               phoneNumber,
               bookings: []
           });

           await user.save();
           const token = jwt.sign(
               { userId: user._id, role: user.role },
               process.env.JWT_SECRET,
               { expiresIn: '24h' }
           );

           res.status(201).json({
               token,
               user: {
                   firstName,
                   lastName,
                   email,
                   role: user.role
               }
           });
       } catch (error) {
           res.status(500).json({ message: 'Erreur lors de l\'inscription' });
       }
   },

   login: async (req, res) => {
       try {
           const { email, password } = req.body;
           const user = await User.findOne({ email });
           if (!user) {
               return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
           }
           const isMatch = await bcrypt.compare(password, user.password);
           if (!isMatch) {
               return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
           }
           const token = jwt.sign(
               { userId: user._id, role: user.role },
               process.env.JWT_SECRET,
               { expiresIn: '24h' }
           );
           res.json({
               token,
               user: {
                   id: user._id,
                   email: user.email,
                   role: user.role
               }
           });
       } catch (error) {
           res.status(500).json({ message: 'Erreur lors de la connexion' });
       }
   }
};

module.exports = authController;