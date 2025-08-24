const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Bill } = require("../models/bill");
const auth = require("../helpers/auth");
const checkRole = require("../helpers/checkRole");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

//GETS
router.get("/", auth.auth, async (req, res) => {
  const bills = await Bill.find();
  if (!bills) {
    return res.status(500).json({ success: false, message: "" });
  }
  return res.status(200).send(bills);
});

//POSTS
router.post("/generateReport", auth.auth, async (req, res) => {
  const generatedUUID = uuid.v1();
  const {
    name,
    email,
    phoneNumber,
    paymentMethod,
    total,
    productDetails,
    createdBy,
  } = req.body;

  const productDetailsReport = JSON.parse(productDetails);
  let bill = new Bill({
    name,
    email,
    phoneNumber,
    uuid: generatedUUID,
    paymentMethod,
    total,
    productDetails: productDetailsReport,
    cartItems: productDetailsReport,
    createdBy,
  });
  bill = await bill.save();
  if (!bill) {
    return res.status(500).json({ success: false, message: "" });
  }
  ejs.renderFile(
    path.join(__dirname, "", "report.ejs"),
    {
      productDetails: productDetailsReport,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      paymentMethod: paymentMethod,
      totalAmount: total,
    },
    {},
    (error, results) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "report cannot be generated",
          error: error,
        });
      }
      pdf
        .create(results)
        .toFile(`./reports/${generatedUUID}.pdf`, (error, data) => {
          if (error) {
            return res.status(500).json({
              success: false,
              message: "pdf cannot be generated",
              error: error,
            });
          }
          return res.status(200).json({
            success: true,
            message: "",
            uuid: generatedUUID,
            billId: bill._id,
          });
        });
    }
  );
});

router.post("/getPdf/:id", async (req, res) => {
  const id = req.params.id;
  const bill = await Bill.findById(id);
  if (!bill) {
    return res
      .status(404)
      .json({ success: false, message: "bill does not exist" });
  }
  const {
    name,
    email,
    phoneNumber,
    paymentMethod,
    uuid,
    total,
    productDetails,
  } = bill;
  const pdfPath = `./reports/${uuid}.pdf`;
  if (fs.existsSync(pdfPath)) {
    res.contentType("application/pdf");
    fs.createReadStream(pdfPath).pipe(res);
  } else {
    const productDetailsReport = productDetails;
    ejs.renderFile(
      path.join(__dirname, "", "report.ejs"),
      {
        productDetails: productDetailsReport,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        paymentMethod: paymentMethod,
        totalAmount: total,
      },
      {},
      (error, results) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "report cannot be generated",
            error: error,
          });
        }
        pdf.create(results).toFile(`./reports/${uuid}.pdf`, (error, data) => {
          if (error) {
            return res.status(500).json({
              success: false,
              message: "pdf cannot be generated",
              error: error,
            });
          }
          res.status(200).contentType("application/pdf");
          fs.createReadStream(pdfPath).pipe(res);
        });
      }
    );
  }
});

//DELETE
router.delete("/:id", auth.auth, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "invalid bill id" });
  }
  const bill = await Bill.findByIdAndDelete(id);
  if (!bill) {
    return res
      .status(500)
      .json({ success: false, message: "bill cannot be deleted" });
  }
  return res
    .status(200)
    .json({ success: true, message: "bill deleted successfully" });
});

module.exports = router;
