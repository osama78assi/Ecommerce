const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const path = require("path");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const sanitize = require("express-mongo-sanitize");

const app = express();

// Some security headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Set your frontend URL here
    credentials: true, // Allow credentials like cookies
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: "Content-Type", // Set necessary headers
  })
);

app.use(express.json());

// Handle mongo injection
app.use(sanitize());

// Prevent Cross Site Scripting
app.use(xss());

app.use(cookieParser());

// Make the folder uploads accessible to the public
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Applying rate limiter to the api
app.use(
  "/api",
  rateLimiter({
    max: 500,
    windowMs: 1000 * 60 * 60,
    message: "Too many requests. try again after one hour",
  }),
  router
);

app.use("*", (req, res) => {
  res.status(404).json({
    message: "Page not found",
    error: true,
    success: false,
  });
});

const PORT = 5000 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log("Server is running on port " + PORT);
    console.log("Frontend host is: ", process.env.FRONTEND_URL);
  });
});
