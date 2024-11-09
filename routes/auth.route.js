const express = require('express');
const validateUser = require('../validators/userValidator');
const authController = require('../controllers/auth.controllers'); // Ensure the correct file path
const authMiddleware = require('../middlewares/auth.middleware'); // Ensure the correct file path
const passwordController = require('../controllers/password.controllers');
const verificationController = require('../controllers/verification.controllers');
const categoryController = require('../controllers/category.controllers');
const productController = require('../controllers/product.controllers');

const isAdmin = require('../middlewares/admin.middleware');
const isModerator = require('../middlewares/isModerator.middleware');


const router = express.Router();


// Admin-only route
router.post('/categories', [authMiddleware, isAdmin], categoryController.createCategory);

// Moderator or admin route
router.delete('/products/:id', [authMiddleware, isModerator], productController.deleteProduct);

// Routes
router.post('/register', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Continue with registration logic...
    await authController.register(req, res);
});


router.post('/login', authController.login);

// Protected route example
router.post('/protected-route', authMiddleware, (req, res) => {
    // Handle request knowing user is authenticated
    res.status(200).json({ message: 'You have accessed a protected route', userId: req.userId });
});

router.post('/forgot-password', passwordController.forgotPassword);
router.post('/reset-password', passwordController.resetPassword);


router.post('/send-verification-email', authMiddleware, verificationController.sendVerificationEmail);
router.post('/verify-email', verificationController.verifyEmail);

module.exports = router;
