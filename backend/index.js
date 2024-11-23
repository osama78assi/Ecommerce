const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const path = require('path');


const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Set your frontend URL here
    credentials: true, // Allow credentials like cookies
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization", // Set necessary headers
  })
);
app.use(express.json());
app.use(cookieParser());

// Make the folder uploads accessible to the public
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api", router);

const PORT = 5000 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connnect to DB");
    console.log("Server is running " + PORT);
    console.log("Front host is : ", process.env.FRONTEND_URL);
  });
});

