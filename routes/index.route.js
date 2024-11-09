const express = require('express');
const productRouter = require('./product.routes');
const categoryRouter = require('./category.routes');
const userRouter = require('./user.routes');

const router = express.Router();

// Use the imported routers with specific prefixes
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/users', userRouter);

module.exports = router; // Export the combined router
