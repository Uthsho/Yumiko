const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  serverid: {type:Number, required:true},
  name: {type:String, default: 'cc'},
  commands: {type:Array}
});

module.exports = mongoose.model("cc", productSchema);