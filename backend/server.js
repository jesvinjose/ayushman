const express = require("express");
const connectDB = require("./db"); // Import the database configuration file
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
connectDB();

// Enable pre-flight requests for all routes
app.options("*", cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json({ limit: "1000mb" }));

// Parse URL-encoded data with extended mode
app.use(express.urlencoded({ extended: true, limit: "1000mb" }));

// Enable CORS for all routes
app.use(cors({ origin: true, credentials: true }));

const path = require("path");

// Serve static files from the public directory
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

// Middleware setup
app.use(express.json());

const adminRoute = require("./routes/adminRoutes");
const treatmentRoute=require("./routes/treatmentRoutes");
const consultantRoute=require("./routes/consultantRoutes");

app.use("/api/admin", adminRoute);
app.use("/api/treatment", treatmentRoute);
app.use("/api/consultant", consultantRoute);

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Open in browser: http://localhost:${port}/`);
});

