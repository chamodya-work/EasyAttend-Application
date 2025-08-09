
const db = require('../config/db');

const Attendance = {
    mark: (attendance, callback) => {
        db.query('INSERT INTO attendance (user_id, date, status) VALUES (?, ?, ?)', 
            [attendance.user_id, attendance.date, attendance.status], callback);
    },
    getByUser: (userId, callback) => {
        db.query('SELECT * FROM attendance WHERE user_id = ?', [userId], callback);
    },
    getAll: (callback) => {
        db.query('SELECT * FROM attendance', callback);
    }
};

module.exports = Attendance;