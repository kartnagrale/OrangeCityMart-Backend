const express = require('express');
const router = express.Router();
const {auth} = require('../middlewares/auth.middleware');  //if error {auth} to auth
const productController = require('../controllers/product.controllers');

// Get all products with filters
router.get('/', productController.getProducts);

// Create new product
router.post('/create', auth, productController.createProduct);

// Get single product
router.get('/:id', productController.getProduct);

// Update product
router.put('/update/:id', auth, productController.updateProduct);

// Delete product
router.delete('/:id', auth, productController.deleteProduct);


module.exports = router;