const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  name: {type:String, default: "autorole"},
  serverid: {type:Number, required:true},
  roles: {type:Array}
});

module.exports = mongoose.model("autorole", productSchema);