const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const attendanceRoutes = require('./routes/attendance');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use(express.json()); // Parse JSON bodies

app.use('/api/users', userRoutes);
app.use('/api/attendance', attendanceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});