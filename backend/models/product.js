const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
});

exports.Product = mongoose.model("Product", productSchema);
