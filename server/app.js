require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

// routes
const userRoutes = require("./routes/userRoutes");

app.get("/", (req, res) => {
    res.send("Krishna Kumar 🙏")
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// database
connectDB();

app.use("/", userRoutes);

module.exports = app;
