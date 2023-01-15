const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single post
const getPost = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all posts by a single user
const getPostsByUser = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        // get author id from the request body
        authorId: parseInt(req.params.id),
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        // get author id from the request body (this is the logged in user)
        authorId: req.body.user,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await prisma.post.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        title: req.body.title,
        content: req.body.content,
        authorId: req.body.authorId,
      },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await prisma.post.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const testRoute = async (req, res) => {
  try {
    res.status(200).json({ message: "Hello World!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPosts,
  getPost,
  getPostsByUser,
  createPost,
  updatePost,
  deletePost,
  testRoute,
};
