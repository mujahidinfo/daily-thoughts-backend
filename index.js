const express = require("express");
const env = require("dotenv").config();
// Import the router
// connet to prisma database
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const routers = require("./router/v1/index");
const prisma = new PrismaClient();

const app = express();
// use express.json() to parse JSON bodies
app.use(express.json());
// cors middleware
// corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };
app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});
// use the router
app.use("/api/v1", routers);

// connect to the database
prisma.$connect().then(() => {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

// close the database connection
process.on("SIGINT", () => {
  prisma.$disconnect();
});

module.exports = app;
