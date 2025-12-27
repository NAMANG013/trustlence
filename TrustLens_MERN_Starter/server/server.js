
const express = require("express");
const mongoose = require("mongoose");
const scanRoutes = require("./routes/scanRoutes");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1/trustlens");

app.use("/api", scanRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
