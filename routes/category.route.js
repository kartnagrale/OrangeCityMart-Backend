const express = require('express');
const categoryRouter = express.Router();
const auth = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/admin.middleware');
const categoryController = require('../controllers/category.controllers');


// Get all categories
categoryRouter.get('/', categoryController.getCategories);

// Create category (admin only)
categoryRouter.post('/', [auth, isAdmin], categoryController.createCategory);

module.exports = categoryRouter;