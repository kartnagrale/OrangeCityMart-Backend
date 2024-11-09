const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controllers');
const { User } = require('../models/user.model');
const { auth } = require('../middlewares/auth.middleware'); // Ensure the correct path to the auth middleware
const Product = require('../models/product.model'); // Ensure the correct import for Product model


// Get user profile
userRouter.get('/profile', auth, userController.getUserProfile);

// Update user profile
userRouter.put('/profile', auth, userController.updateUserProfile);

// Get user's products
userRouter.get('/my-products', auth, userController.getUserProducts);


router.put('/profile', auth, userController.updateProfile);

module.exports = userRouter; // Ensure you are exporting userRouter
