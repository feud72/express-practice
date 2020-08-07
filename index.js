const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const postsRoute = require("./routes/posts");
app.use("/posts/", postsRoute);

app.get("/", (req, res) => {
  res.send("We are on Home");
});

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB!")
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
