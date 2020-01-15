const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  name: {type:String, default: "profile", required:true},
  money: {type:String, default: "0"},
  userid: {type:String, required:true},
  pets: {type:Array},
  items: {type:Array},
  redeems: {type:Array},
  badges: {type:Array}
});

module.exports = mongoose.model('Profile', productSchema);
