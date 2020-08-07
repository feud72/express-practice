const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    return res.json(posts);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const post = new Post({
    title,
    description,
  });
  try {
    const savedPost = await post.save();
    return res.json(savedPost);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    return res.json(post);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.deleteOne({ _id: id });
    return res.json(post);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const post = await Post.updateOne(
      { _id: id },
      { $set: { title, description } }
    );
    return res.json(post);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

module.exports = router;
