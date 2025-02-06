// routes/transactions.js
const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transactions");
// GET /api/transactions?month=March&search=abc&page=1&perPage=10
router.get("/", async (req, res) => {
  try {
    const { month, search = "", page = 1, perPage = 10 } = req.query;
    // Convert month name to a number (0-11)
    const monthNumber = new Date(`${month} 1, 2000`).getMonth();
    if (isNaN(monthNumber)) {
      return res.status(400).json({ error: "Invalid month parameter" });
    }
    // Build a query for dateOfSale that ignores year.
    // One approach is to use MongoDB aggregation and extract month from date.
    // Here, we use a regex on the month name for simplicity if date is stored as a string.
    // However, assuming dateOfSale is stored as a Date, we can use $expr and $month.
    // Build search query for title, description, or price (as string)
    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { price: { $regex: search, $options: "i" } }, // convert price to string if needed
        ],
      };
    }
    // Find transactions that match the month irrespective of the year.
    // Use an aggregation pipeline:
    const pipeline = [
      {
        $addFields: {
          saleMonth: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          saleMonth: monthNumber + 1, // MongoDB months are 1-12
          ...searchQuery,
        },
      },
      {
        $skip: (parseInt(page) - 1) * parseInt(perPage),
      },
      {
        $limit: parseInt(perPage),
      },
    ];
    const transactions = await Transaction.aggregate(pipeline);
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});
module.exports = router;
