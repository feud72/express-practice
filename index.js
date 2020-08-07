const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);
app.use("/api/user", authRoute);

app.get("/", (req, res) => {
  res.send("We are on Home");
});

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB!")
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
