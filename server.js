const express = require("express");
const env = require("dotenv").config();
// Import the router
// connet to prisma database
const { PrismaClient } = require("@prisma/client");
const router = require("./router/v1/");
const prisma = new PrismaClient();

const app = express();
// use express.json() to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});
app.use("api/v1", router);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
