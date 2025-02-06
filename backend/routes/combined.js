// routes/combined.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const BASE_URL = "http://localhost:5000/api"; // Adjust if different
// GET /api/combined?month=March&search=abc&page=1&perPage=10
router.get("/", async (req, res) => {
  try {
    const { month, search, page, perPage } = req.query;
    // Build query strings for each endpoint
    const transactionsURL = `${BASE_URL}/transactions?month=${month}&search=${
      search || ""
    }&page=${page || 1}&perPage=${perPage || 10}`;
    const statsURL = `${BASE_URL}/stats?month=${month}`;
    const barChartURL = `${BASE_URL}/charts/bar?month=${month}`;
    const pieChartURL = `${BASE_URL}/charts/pie?month=${month}`;
    // Fetch all data concurrently
    const [transactionsRes, statsRes, barChartRes, pieChartRes] =
      await Promise.all([
        axios.get(transactionsURL),
        axios.get(statsURL),
        axios.get(barChartURL),
        axios.get(pieChartURL),
      ]);
    const combinedData = {
      transactions: transactionsRes.data,
      statistics: statsRes.data,
      barChart: barChartRes.data,
      pieChart: pieChartRes.data,
    };
    res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error fetching combined data:", error.message);
    res.status(500).json({ error: "Failed to fetch combined data" });
  }
});
module.exports = router;
