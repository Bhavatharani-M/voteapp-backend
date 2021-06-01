const mongoose = require('mongoose');

const canSchema = new mongoose.Schema({
  name: String,
  imgurl: String,
  party: String,
  votes: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model('Candidate', canSchema);
