const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
const usersRouter = require("./users/userRouter");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "WELCOME!!!" });
});

server.use("/api/", usersRouter);
const port = process.env.PORT || 4545;

server.listen(port, () => {
  console.log(`\nThe server is listening on ${port}`);
});
