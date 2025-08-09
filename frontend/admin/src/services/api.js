import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getUsers = () => api.get('/users');
export const addUser = (user) => api.post('/users', user);
export const markAttendance = (attendance) => api.post('/attendance', attendance);
export const getAttendanceByUser = (userId) => api.get(`/attendance/user/${userId}`);

export default api;