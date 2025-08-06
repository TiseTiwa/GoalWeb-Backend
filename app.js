const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config();

const goalRoutes = require("./routes/goalRoutes");

// Initialize the express application
const app = express();

// define the port
const port = process.env.PORT || 4000;


// All middlewares ||
// cors
app.use(cors());

// middleware
app.use(express.json());

// routes middleware
app.use("/api/goals", goalRoutes);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database connected");

    app.listen(port, () => {
      console.log(`server is running on PORT ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();

// ismailtisetiwa VtLdMAsXP6l1h1ut
// mongodb+srv://ismailtisetiwa:VtLdMAsXP6l1h1ut@cluster0.p83ocqg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
