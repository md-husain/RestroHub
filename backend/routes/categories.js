const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Category } = require("../models/category");
const auth = require("../helpers/auth");
const checkRole = require("../helpers/checkRole");
//GETS
router.get("/", auth.auth, checkRole.checkRole, async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    return res.status(500).json({ success: false, message: "" });
  }
  return res.status(200).send(categoryList);
});

router.get("/:id", auth.auth, checkRole.checkRole, async (req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: "category not found" });
  }
  return res.status(200).send(category);
});

//PUTS
router.put("/:id", auth.auth, checkRole.checkRole, async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const category = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );
  if (!category) {
    return res
      .status(500)
      .json({ success: false, message: "category can not be updated" });
  }
  return res.status(200).send(category);
});

//POSTS
router.post("/", auth.auth, checkRole.checkRole, async (req, res) => {
  const { name } = req.body;
  let category = new Category({ name });
  category = await category.save();
  if (!category) {
    return res
      .status(500)
      .json({ success: false, message: "category could not be created" });
  }
  return res.status(201).send(category);
});

//DELETE
router.delete("/:id", auth.auth, checkRole.checkRole, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .json({ success: false, message: "invalid category id" });
  }
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return res
      .status(500)
      .json({ success: false, message: "category cannot be deleted" });
  }
  return res
    .status(200)
    .json({ success: true, message: "category deleted successfully" });
});

module.exports = router;
