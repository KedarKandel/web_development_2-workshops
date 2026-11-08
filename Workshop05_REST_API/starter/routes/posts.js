const express = require("express");
const mongoose = require("mongoose");

const Post = require("../models/Post");

const router = express.Router();

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.post("/", async (req, res) => {
  // TODO: Create a new Post instance from req.body.
  // TODO: Save it to MongoDB.
  // TODO: Return the created post with status code 201.
  try {
    const { title, content, author } = req.body;
    const post = new Post({ title, content, author });
    const savedPost = await post.save();
    res.status(201).json({
      message: "Post saved successfully",
      savedPost,
    });
  } catch (error) {
    console.error(error.stack)
    return res.status(500).json({ message: "internal server error"});
  }
});

router.get("/", async (req, res) => {
  // TODO: Query all posts from MongoDB.
  // TODO: Return the results as JSON.
  return res.status(501).json({ message: "TODO: implement GET /api/posts" });
});

router.get("/:id", async (req, res) => {
  // TODO: Validate req.params.id using isValidObjectId().
  // TODO: Find one post by id.
  // TODO: Return 404 if the post is not found.
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid post id" });
  }

  return res
    .status(501)
    .json({ message: "TODO: implement GET /api/posts/:id" });
});

router.put("/:id", async (req, res) => {
  // TODO: Validate req.params.id using isValidObjectId().
  // TODO: Update the post with req.body.
  // TODO: Return the updated post as JSON.
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid post id" });
  }

  return res
    .status(501)
    .json({ message: "TODO: implement PUT /api/posts/:id" });
});

router.delete("/:id", async (req, res) => {
  // TODO: Validate req.params.id using isValidObjectId().
  // TODO: Delete the post by id.
  // TODO: Return a success message as JSON.
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid post id" });
  }

  return res
    .status(501)
    .json({ message: "TODO: implement DELETE /api/posts/:id" });
});

module.exports = router;
