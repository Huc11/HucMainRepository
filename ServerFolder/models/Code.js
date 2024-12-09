// models/Code.js

const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // 引用 User 模型
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Code', CodeSchema);
