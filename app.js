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


// ✅ Root route
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Web Goal API</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f4f8;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        h1 {
          color: #0167FF;
          font-size: 2.5rem;
        }
        p {
          font-size: 1.2rem;
          color: #333;
        }
        .badge {
          margin-top: 10px;
          background: #0167FF;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <h1>🎯 Web Goal API</h1>
      <p>Backend is successfully running on Render!</p>
      <div class="badge">/api/goals → REST API endpoint</div>
    </body>
    </html>
  `);
});



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

