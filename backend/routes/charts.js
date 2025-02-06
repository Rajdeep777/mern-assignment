// routes/charts.js
const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transactions");
// Helper: Define price ranges
const priceRanges = [
  { label: "0 - 100", min: 0, max: 100 },
  { label: "101 - 200", min: 101, max: 200 },
  { label: "201 - 300", min: 201, max: 300 },
  { label: "301 - 400", min: 301, max: 400 },
  { label: "401 - 500", min: 401, max: 500 },
  { label: "501 - 600", min: 501, max: 600 },
  { label: "601 - 700", min: 601, max: 700 },
  { label: "701 - 800", min: 701, max: 800 },
  { label: "801 - 900", min: 801, max: 900 },
  { label: "901-above", min: 901, max: Number.MAX_VALUE },
];
// GET /api/charts/bar?month=March
router.get("/bar", async (req, res) => {
  try {
    const { month } = req.query;
    const monthNumber = new Date(`${month} 1, 2000`).getMonth();
    if (isNaN(monthNumber)) {
      return res.status(400).json({ error: "Invalid month parameter" });
    }
    // Filter transactions by month first
    const pipeline = [
      {
        $addFields: { saleMonth: { $month: "$dateOfSale" } },
      },
      {
        $match: { saleMonth: monthNumber + 1 },
      },
    ];
    const transactions = await Transaction.aggregate(pipeline);
    // Count transactions per price range
    const result = priceRanges.map((range) => {
      const count = transactions.filter(
        (item) => item.price >= range.min && item.price <= range.max
      ).length;
      return { range: range.label, count };
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).json({ error: "Failed to fetch bar chart data" });
  }
});
// GET /api/charts/pie?month=March
router.get("/pie", async (req, res) => {
  try {
    const { month } = req.query;
    const monthNumber = new Date(`${month} 1, 2000`).getMonth();
    if (isNaN(monthNumber)) {
      return res.status(400).json({ error: "Invalid month parameter" });
    }
    // Aggregate unique categories and count items per category for the selected month
    const pipeline = [
      {
        $addFields: { saleMonth: { $month: "$dateOfSale" } },
      },
      {
        $match: { saleMonth: monthNumber + 1 },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ];
    const pieData = await Transaction.aggregate(pipeline);
    // Format result as an array of objects with category and count
    const result = pieData.map((item) => ({
      category: item._id,
      count: item.count,
    }));
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    res.status(500).json({ error: "Failed to fetch pie chart data" });
  }
});
module.exports = router;
