const express = require('express');
const router = express.Router();

// Route de test simple
router.get('/test', function(req, res) {
    console.log('Test route accessed');
    return res.status(200).json({ message: 'Test route works!' });
});

module.exports = router;