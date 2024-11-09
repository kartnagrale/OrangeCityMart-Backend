// models/Message.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Message schema
const MessageSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });


// Export the Message model
module.exports = mongoose.model('Message', MessageSchema);
