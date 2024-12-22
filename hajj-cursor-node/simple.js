const express = require('express');
const app = express();

// Route simple
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Démarrage du serveur
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
}); 