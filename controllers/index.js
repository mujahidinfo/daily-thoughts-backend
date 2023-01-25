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
// User routes
const { getUser } = require("./user/userController");

module.exports = {
  // Auth Controllers
  signup,
  login,
  logout,
  // User Controllers
  getUser,
  // Post Controllers
  getPosts,
  getPost,
  getPostsByUser,
  createPost,
  updatePost,
  deletePost,
  testRoute,
};
