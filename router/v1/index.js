const router = require("express").Router();
const { getPosts, createPost } = require("../../controllers");

// define the routes
router.get("/posts", getPosts);
router.post("/create", createPost);

// export the router
module.exports = router;
