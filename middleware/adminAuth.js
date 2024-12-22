const adminAuth = async (req, res, next) => {
  try {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Accès refusé. Droits d\'administrateur requis.' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Erreur d\'authentification' });
  }
};

module.exports = adminAuth; 