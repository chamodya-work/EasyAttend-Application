// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');

// router.get('/', (req, res) => {
//     User.getAll((err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json(results);
//     });
// });

// router.post('/', (req, res) => {
//     const user = req.body;
//     User.create(user, (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json({ id: result.insertId, ...user });
//     });
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    User.getAll((err, results) => {
        if (err) {
            console.error('Get users error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    
    const user = req.body;
    if (!user.name || !user.email || !user.password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    User.create(user, (err, result) => {
        if (err) {
            console.error('Create user error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, name: user.name, email: user.email, role: user.role });
    });
});

module.exports = router;