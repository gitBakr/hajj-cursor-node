const User = require('../models/User');
const jwt = require('jsonwebtoken');  // Correctionici
const bcrypt = require('bcryptjs');
const authController = {
   // Inscription
   register: async (req, res) => {
       try {
           const { firstName, lastName, email, password, phoneNumber } = req.body;
           
           // Vérifier si l'utilisateur existe déjà
           const existingUser = await User.findOne({ email });
           if (existingUser) {
               return res.status(400).json({ message: 'Cet email est déjà utilisé' });
           }
           
           // Hasher le mot de passe
           const hashedPassword = await bcrypt.hash(password, 10);
           
           // Créer le nouvel utilisateur
           const user = new User({
               firstName,
               lastName,
               email,
               password: hashedPassword,
               phoneNumber
           });
            await user.save();
            // Générer le token
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
    // Connexion
   login: async (req, res) => {
       try {
           const { email, password } = req.body;
           
           // Trouver l'utilisateur
           const user = await User.findOne({ email });
           if (!user) {
               return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
           }
            // Vérifier le mot de passe
           const isMatch = await bcrypt.compare(password, user.password);
           if (!isMatch) {
               return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
           }
            // Créer le token
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
   }}
;
module.exports = authController;