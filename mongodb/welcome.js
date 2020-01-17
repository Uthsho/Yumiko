const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  guildid: {type:Number, required:true},
  name: {type:String, default: 'welcome'},
  channel: {type:String, required:true}
});

module.exports = mongoose.model('welcome', productSchema);
