const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route de test directe
app.get('/test', (req, res) => {
    console.log('Test route hit');
    res.json({ message: 'Main test route works!' });
});

// Route auth test directe
app.get('/api/auth/test', (req, res) => {
    console.log('Auth test route hit');
    res.json({ message: 'Auth test route works!' });
});

// Démarrage du serveur
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Available routes:');
    console.log('- GET /test');
    console.log('- GET /api/auth/test');
}); 