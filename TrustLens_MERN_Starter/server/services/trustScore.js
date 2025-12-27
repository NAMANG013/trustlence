
module.exports = function(scan, virus) {
  let score = 100;
  if (!scan.https) score -= 20;
  if (scan.responseTime > 2000) score -= 15;
  if (virus.infected) score -= 25;

  let risk = score < 50 ? "High" : score < 80 ? "Medium" : "Low";
  return { score, risk };
};
