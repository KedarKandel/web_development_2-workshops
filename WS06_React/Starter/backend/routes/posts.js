const express = require("express");
const mongoose = require("mongoose");

const Post = require("../models/Post");

const router = express.Router();

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.post("/", async (req, res) => {
  // console.log(req.body)
  try {
    const post = new Post(req.body);
    const saved = await post.save();
    return res.status(201).json({message:"New post created!", saved});
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid post id" });
  }

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  // TODO (student): Implement UPDATE operation for one post.
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid post id" });
  }
  try {
    const { title, author, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, author, content },
      { new: true, runValidators: true },
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found." });
    }
    return res
      .status(200)
      .json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    console.error(error.stack);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  // TODO (student): Implement DELETE operation for one post.
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid post id" });
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
