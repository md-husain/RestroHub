const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv/config");

//middlewares
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan("tiny"));

//routes
const usersRoutes = require("./routes/users");
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const billsRoutes = require("./routes/bills");
const dashboardsRoutes = require("./routes/deshboards");
const topupsRouter = require('./routes/topups');

app.use("/api/users", usersRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/bills", billsRoutes);
app.use("/api/dashboards", dashboardsRoutes);
app.use('/api/topups', topupsRouter);
//connection

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "restaurant-database",
  })
  .then(() => {
    console.log("Connected to mongodb..");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT, () => {
  console.log(`Md hussu server is running at http://localhost:${process.env.PORT}`);
});
