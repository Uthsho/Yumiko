const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  name: {type:String, default: "swear"},
  serverid: {type:Number, required:true},
  e: {type:String},
  extra: {type:Array}
});

module.exports = mongoose.model("swear", productSchema);