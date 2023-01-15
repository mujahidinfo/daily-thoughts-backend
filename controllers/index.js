const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  testRoute,
  getPost,
  getPostsByUser,
} = require("./post/postController");
// Auth routes
const { signup, login, logout } = require("./auth/authController");

module.exports = {
  // Auth Controllers
  signup,
  login,
  logout,
  // Post Controllers
  getPosts,
  getPost,
  getPostsByUser,
  createPost,
  updatePost,
  deletePost,
  testRoute,
};
