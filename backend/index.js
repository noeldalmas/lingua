// index.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/utils/database");
const userRoutes = require("./src/routes/userRoutes");
const courseRoutes = require("./src/routes/courseRoutes");
const lessonRoutes = require("./src/routes/lessonRoutes");
const aggregatorRoutes = require("./src/routes/aggregatorRoutes");
const recommenderRoutes = require("./src/routes/recommenderRoutes");
const feedbackRoutes = require("./src/routes/feedbackRoutes");
const { notFound, errorHandler } = require("./src/middleware/errorMiddleware");
const cors = require("cors");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Lingua project backend!");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/aggregator", aggregatorRoutes);
app.use("/api/recommendations", recommenderRoutes);
app.use("/api/feedback", feedbackRoutes);

// Not found middleware
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
