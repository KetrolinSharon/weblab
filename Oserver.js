// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/movieBooking", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Connection Error:", err));

// Schema for booked seats
const seatSchema = new mongoose.Schema({
  name: String
});

// Model
const Seat = mongoose.model("Seat", seatSchema);

// 🟢 Get all booked seats
app.get("/booked", async (req, res) => {
  const booked = await Seat.find();
  res.json(booked);
});

// 🟢 Book new seats
app.post("/book", async (req, res) => {
  try {
    const seats = req.body; // Array of seats
    await Seat.insertMany(seats);
    const all = await Seat.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: "Failed to save seats" });
  }
});

// Start the server
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
