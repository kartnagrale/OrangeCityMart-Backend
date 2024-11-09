const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controllers');
const { auth } = require('../middlewares/auth.middleware');

// Get all messages for the authenticated user
router.get('/', auth, messageController.getMessages);

// Get a specific message
router.get('/:id', auth, messageController.getMessage);

// Send a new message
router.post('/', auth, messageController.sendMessage);

// Update a message
router.put('/:id', auth, messageController.updateMessage);

// Delete a message
router.delete('/:id', auth, messageController.deleteMessage);

module.exports = router;