const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// ROUTES
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
