// models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameId: String,
  homeTeam: String,
  awayTeam: String,
  dateTime: Date,
  status: String,
  homeScore: Number,
  awayScore: Number
});

module.exports = mongoose.model('Game', gameSchema);