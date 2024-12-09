// models/Team.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamId: String,
  name: String,
  city: String,
  abbreviation: String,
  conference: String,
  division: String
});

module.exports = mongoose.model('Team', teamSchema);