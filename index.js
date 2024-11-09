require("dotenv").config();
const express = require('express');
const connectDB = require("./config/mongodb");
const cors = require("cors");
const app = express();
app.use(cors());

const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route');
const userRoutes = require('./routes/user.route');

const errorHandler = require('./middlewares/errorhandler');

const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});