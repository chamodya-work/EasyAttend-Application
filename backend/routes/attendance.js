
const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance');

router.get('/user/:userId', (req, res) => {
    Attendance.getByUser(req.params.userId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const attendance = {
        user_id: req.body.user_id,
        date: req.body.date,
        status: req.body.status,
    };
    Attendance.mark(attendance, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Attendance marked successfully' });
    });
});

router.get('/', (req, res) => {
    Attendance.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;