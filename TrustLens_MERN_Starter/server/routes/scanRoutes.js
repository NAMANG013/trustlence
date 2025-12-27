
const express = require("express");
const router = express.Router();
const { scan } = require("../controllers/scanController");

router.post("/scan", scan);
module.exports = router;
