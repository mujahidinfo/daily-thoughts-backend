const {
  getPosts,
  createPost,
  testRoute,
  updatePost,
  deletePost,
  signup,
  login,
  logout,
  getPostsByUser,
} = require("../../controllers");
const express = require("express");
const { requireAuth } = require("../../middleware/auth");
const router = express.Router();

// define the routes
// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
// Post routes
// Protected routes
// Get all posts by a single user
router.get("/posts/:id", requireAuth, getPostsByUser);
// create a post
router.post("/posts/create", requireAuth, createPost);
// update a post
router.put("/posts/:id", requireAuth, updatePost);
// delete a post
router.delete("/posts/:id", requireAuth, deletePost);

// export the router
module.exports = router;
