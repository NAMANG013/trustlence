
module.exports = function(headers) {
  let threats = [];
  if (headers["x-powered-by"]) threats.push("Tech disclosure");
  return { infected: threats.length > 0, threats };
};
