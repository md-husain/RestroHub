const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Product } = require("../models/product");
const auth = require("../helpers/auth");
const checkRole = require("../helpers/checkRole");

//GETS
router.get("/", auth.auth, async (req, res) => {
  const productList = await Product.find().populate("category");
  if (!productList) {
    return res.status(500).json({ success: false, message: "" });
  }
  return res.status(200).send(productList);
});

router.get("/:id", auth.auth, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .json({ success: false, message: "invalid product id" });
  }
  const product = await Product.findById(id).populate("category");
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "product not found" });
  }
  return res.status(200).send(product);
});

router.get(
  "/category/:id",
  auth.auth,
  checkRole.checkRole,
  async (req, res) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "invalid category id" });
    }
    const productList = await Product.find({ category: id, status: true });
    if (!productList) {
      return res
        .status(500)
        .json({ success: false, message: "cannot get product list" });
    }
    return res.status(200).send(productList);
  }
);

//PUTS

router.put("/:id", auth.auth, checkRole.checkRole, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .json({ success: false, message: "invalid product id" });
  }
  const { name, categoryId, description, price, status } = req.body;
  const product = await Product.findByIdAndUpdate(
    id,
    { name, category: categoryId, description, price, status },
    { new: true }
  );
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "product cannot be updated" });
  }
  return res.status(200).send(product);
});

router.put(
  "/updateStatus/:id",
  auth.auth,
  checkRole.checkRole,
  async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "invalid product id" });
    }
    const product = await Product.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!product) {
      return res
        .status(500)
        .json({ success: false, message: "product status cannot be updated" });
    }
    return res
      .status(200)
      .json({ success: true, message: "product status updated successfully" });
  }
);

//POSTS
router.post("/", auth.auth, checkRole.checkRole, async (req, res) => {
  const { name, categoryId, description, price, status } = req.body;
  let product = new Product({
    name,
    category: categoryId,
    description,
    price,
    status,
  });
  product = await product.save();
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product could not be created" });
  }
  return res.status(201).send(product);
});

//DELETE
router.delete("/:id", auth.auth, checkRole.checkRole, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .json({ success: false, message: "invalid product id" });
  }
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "product cannot be deleted" });
  }
  return res
    .status(200)
    .json({ success: true, message: "product deleted successfully" });
});

module.exports = router;
