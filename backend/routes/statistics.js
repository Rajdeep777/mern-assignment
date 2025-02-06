// routes/statistics.js
const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transactions");
// GET /api/stats?month=March
router.get("/", async (req, res) => {
  try {
    const { month } = req.query;
    const monthNumber = new Date(`${month} 1, 2000`).getMonth();
    if (isNaN(monthNumber)) {
      return res.status(400).json({ error: "Invalid month parameter" });
    }
    // Aggregation pipeline for matching month
    const pipeline = [
      {
        $addFields: { saleMonth: { $month: "$dateOfSale" } },
      },
      {
        $match: { saleMonth: monthNumber + 1 },
      },
    ];
    // Calculate statistics using aggregation facets
    const stats = await Transaction.aggregate([
      ...pipeline,
      {
        $facet: {
          totalSaleAmount: [
            { $group: { _id: null, total: { $sum: "$price" } } },
          ],
          totalSoldItems: [{ $match: { isSold: true } }, { $count: "count" }],
          totalNotSoldItems: [
            { $match: { isSold: false } },
            { $count: "count" },
          ],
        },
      },
    ]);
    // Format the result
    const result = {
      totalSaleAmount: stats[0].totalSaleAmount[0]?.total || 0,
      totalSoldItems: stats[0].totalSoldItems[0]?.count || 0,
      totalNotSoldItems: stats[0].totalNotSoldItems[0]?.count || 0,
    };
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});
module.exports = router;
