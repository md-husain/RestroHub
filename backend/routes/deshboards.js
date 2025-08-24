const express = require("express");
const router = express.Router();
const auth = require("../helpers/auth");
const checkRole = require("../helpers/checkRole");
const { Category } = require("../models/category");
const { Product } = require("../models/product");
const { Bill } = require("../models/bill");
router.get("/get/overview", auth.auth, checkRole.checkRole, async (req, res) => {
  const categories = await Category.find();
  const products = await Product.find();
  const bills = await Bill.find();
  if (categories && products && bills) {
    return res.status(200).json({
      success: true,
      productsCount: products.length,
      categoriesCount: categories.length,
      billsCount: bills.length,
    });
  }
  return res.status(500).json({ success: false, message: "Server error" });
});

module.exports = router;
