require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userrouter = require("./Routes.js/Userroute");
const app = express();
app.use(cors());
app.use(express.json());

const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url).then(() => {
  console.log("Connected to MongoDB");
});

app.use("/api/user", userrouter);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});


app.listen(5000, () => {
  console.log("server started");
});
