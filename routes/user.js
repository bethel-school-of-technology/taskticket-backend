const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('We are on user');
});

router.get('/id', (req, res) => {
    res.send('specific user');
});

module.exports = router;