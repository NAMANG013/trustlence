
const mongoose = require("mongoose");

const ScanSchema = new mongoose.Schema({
  url: String,
  trustScore: Number,
  riskLevel: String,
  security: Object,
  virus: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Scan", ScanSchema);
