// models/Transaction.js
const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema({
  // Adjust the fields based on the actual JSON structure. Common fields might include:
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  category: { type: String },
  dateOfSale: { type: Date },
  // Additional fields if available (like sold flag etc.)
  isSold: { type: Boolean, default: false }, // if applicable
});
module.exports = mongoose.model("Transaction", TransactionSchema);
