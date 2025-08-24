const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const salt = process.env.SALT;
const auth = require("../helpers/auth");
const checkRole = require("../helpers/checkRole");
const { default: mongoose } = require("mongoose");

//GETS

router.get("/", auth.auth, checkRole.checkRole, async (req, res) => {
  const userList = await User.find({ role: "user" }).select("-passwordHash");
  if (!userList) {
    return res
      .status(404)
      .json({ success: false, message: "cannot get users" });
  }
  return res.status(200).send(userList);
});

router.get("/:id", auth.auth, async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).select("-passwordHash");
  if (!user) {
    return res.status(404).json({ success: false, message: "cannot get user" });
  }
  return res.status(200).send(user);
});

router.get("/checkToken", auth.auth, async (req, res) => {
  return res.status(200).json({ success: true, message: "OK" });
});

//PUTS

router.put("/:id", auth.auth, async (req, res) => {
  const id = req.params.id;
  const { status, role } = req.body;
  const user = await User.findByIdAndUpdate(id, { status, role });
  if (!user) {
    return res
      .status(500)
      .json({ success: false, message: "user cannot be updated" });
  }
  return res.status(200).send(user);
});

//POSTS
router.post("/signup", async (req, res) => {
  const { name, contactNumber, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, +salt);
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "email already exist" });
  }
  let user = new User({
    name,
    contactNumber,
    email,
    passwordHash,
  });
  user = await user.save();
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "user cannot be created" });
  }
  return res.status(201).send(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "user does not exist" });
  }
  if (user && bcrypt.compareSync(password, user.passwordHash)) {
    if (user.status) {
      const accessToken = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_TOKEN,
        { expiresIn: "24h" }
      );
      return res.status(200).json({
        success: true,
        message: "user logged in successfully",
        token: accessToken,
      });
    }
    return res
      .status(401)
      .json({ success: false, message: "wait for admin approval" });
  }
  return res
    .status(401)
    .json({ success: false, message: "invalid email or password" });
});

router.put("/changePassword/:id", auth.auth, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { password } = req.body;
  const user = await User.findByIdAndUpdate(id, {
    passwordHash: bcrypt.hashSync(password, +salt),
  });
  if (!user) {
    return res
      .status(500)
      .json({ success: false, message: "password cannot be updated" });
  }
  return res
    .status(200)
    .json({ success: true, message: "password updated successfully" });
});

router.delete("/:id", auth.auth, checkRole.checkRole, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(403).json({ success: false, message: "Invalid user id" });
  }
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res
      .status(500)
      .json({ success: false, message: "User could not be deleted" });
  }
  return res
    .status(200)
    .json({ success: true, message: "User deleted successfully" });
});

module.exports = router;
