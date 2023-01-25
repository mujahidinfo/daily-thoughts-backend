const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get User controller
const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.body.user),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all users controller
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update user controller
const updateUser = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete user controller
const deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
