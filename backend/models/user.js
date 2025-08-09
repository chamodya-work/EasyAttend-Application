// const db = require('../config/db');

// const User = {
//     getAll: (callback) => {
//         db.query('SELECT * FROM users', callback);
//     },
//     create: (user, callback) => {
//         db.query('INSERT INTO users (name, email, password, role, group_id) VALUES (?, ?, ?, ?, ?)', 
//             [user.name, user.email, user.password, user.role, user.group_id], callback);
//     }
// };

// module.exports = User;

const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    getAll: (callback) => {
        db.query('SELECT id, name, email, role, group_id, created_at FROM users', callback);
    },
    create: (user, callback) => {
        const saltRounds = 10;
        bcrypt.hash(user.password, saltRounds, (err, hash) => {
            if (err) return callback(err);
            db.query(
                'INSERT INTO users (name, email, password, role, group_id) VALUES (?, ?, ?, ?, ?)',
                [user.name, user.email, hash, user.role || 'intern', user.group_id || null],
                callback
            );
        });
    }
};

module.exports = User;