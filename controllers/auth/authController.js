const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Prisma Model
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create a new user
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1 day in milliseconds

    res.status(201).json({ userId: user.id, username: user.name });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).send("No user with that email");
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.status(400).send("Incorrect password");
    }

    const userObject = {
      userId: user.id,
      username: user.name,
      email: user.email,
    };

    const token = jwt.sign(userObject, process.env.JWT_SECRET);
    console.log("token", token);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); // 1 day in milliseconds

    res.status(200).json(userObject);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Logout a user
const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  signup,
  login,
  logout,
};
