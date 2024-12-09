// models/ChatRecord.js

const mongoose = require('mongoose');

const ChatRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messages: [
    {
      user: {
        type: String,
        enum: ['me', 'AI'],
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ChatRecord', ChatRecordSchema);
