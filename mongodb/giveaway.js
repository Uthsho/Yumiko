const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  serverid: {type:Number, required:true},
  name: {type:String, default: 'giveaway'},
  giveaway: {type:Array}
});

module.exports = mongoose.model("giveaway", productSchema);