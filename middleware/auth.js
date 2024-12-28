const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        
        // Si pas de token, on continue sans authentification
        if (!authHeader) {
            req.user = null;
            return next();
        }

        // Si token présent, on vérifie
        const token = authHeader.replace('Bearer ', '');
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch (error) {
            req.user = null;
        }
        next();
    } catch (error) {
        req.user = null;
        next();
    }
};

module.exports = auth; 