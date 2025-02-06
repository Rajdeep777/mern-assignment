// routes/seed.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const Transaction = require("../models/Transactions");
// GET /api/seed
router.get("/", async (req, res) => {
  try {
    // Fetch data from third party API
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = response.data;
    // Remove existing data if you want to re-seed
    await Transaction.deleteMany({});
    // Insert the seed data
    await Transaction.insertMany(data);
    res.status(200).json({ message: "Database seeded successfully!" });
  } catch (error) {
    console.error("Error seeding database", error);
    res.status(500).json({ error: "Failed to seed database" });
  }
});
module.exports = router;
