// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();
// Import routes
const seedRoutes = require('./routes/seed');
const transactionsRoutes = require('./routes/transactions');
const statsRoutes = require('./routes/statistics');
const chartsRoutes = require('./routes/charts');
const combinedRoutes = require('./routes/combined');
// Use routes
app.use('/api/seed', seedRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/charts', chartsRoutes);
app.use('/api/combined', combinedRoutes);
// Connect to MongoDB
const MONGO_URI = process.env.MONGODB_URL; // Change as necessary
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => console.log(err));
