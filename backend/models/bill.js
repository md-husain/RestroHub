const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  uuid: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  total: { type: Number, required: true },
  productDetails: { type: Object, default: null },
  cartItems: { type: Object, default: null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
});

exports.Bill = mongoose.model("Bill", billSchema);
