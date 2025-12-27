
const axios = require("axios");

module.exports = async function(url) {
  const start = Date.now();
  const res = await axios.get(url);
  return {
    https: url.startsWith("https"),
    responseTime: Date.now() - start,
    status: res.status,
    headers: res.headers
  };
};
