var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Ninjago = new Schema({
  name: { type: String },
  color: { type: String },
  power: { type: String },
  weapon: { type: String },
  found: { type: String },
  turns: { type: String }
});

module.exports = mongoose.model('Ninjago', Ninjago);
