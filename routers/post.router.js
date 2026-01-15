const express = require("express");
const { verifyAuth } = require("../middlewares/verifyAuth");
const {
  getAllPosts,
  createPost,
  toggleLike,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

const postRouter = express.Router();

// method: get, route: /posts , middleware: verifyAuth, controller: getAllPosts
postRouter.get("/", verifyAuth, getAllPosts);
// method: get, route: /posts , middleware: verifyAuth, controller: createPost
postRouter.post("/", verifyAuth, createPost);
// method: post, route: /posts/like/:postId, middleware: verifyAuth, controller: toggleLike
postRouter.post("/like/:postId", verifyAuth, toggleLike);
// method: put, route: /posts/:postId, middleware: verifyAuth, controller: updatePost
postRouter.put("/:postId", verifyAuth, updatePost);
postRouter.delete("/:postId", verifyAuth, deletePost);

module.exports = { postRouter };
