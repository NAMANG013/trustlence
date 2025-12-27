
const scanURL = require("../services/scanner");
const virusCheck = require("../services/virusCheck");
const calculateTrust = require("../services/trustScore");
const Scan = require("../models/Scan");

exports.scan = async (req, res) => {
  const { url } = req.body;
  try {
    const scanResult = await scanURL(url);
    const virusResult = virusCheck(scanResult.headers);
    const trust = calculateTrust(scanResult, virusResult);

    const saved = await Scan.create({
      url,
      trustScore: trust.score,
      riskLevel: trust.risk,
      security: scanResult,
      virus: virusResult
    });

    res.json(saved);
  } catch {
    res.status(500).json({ error: "Scan failed" });
  }
};
