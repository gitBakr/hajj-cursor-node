const express = require('express');
const app = express();

// Middleware de base
app.use(express.json());

// Route racine
app.get('/', (req, res) => {
    console.log('Root route accessed');
    res.json({ message: 'Welcome to the API' });
});

// Route test
app.get('/test', (req, res) => {
    console.log('Test route accessed');
    res.json({ message: 'Test route works!' });
});

// Route auth test
app.get('/api/auth/test', (req, res) => {
    console.log('Auth test route accessed');
    res.json({ message: 'Auth test route works!' });
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('- GET /');
    console.log('- GET /test');
    console.log('- GET /api/auth/test');
});
