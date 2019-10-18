const express = require("express");
const helmet = require("helmet");
const cors = require("cors");


const server = express();


server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "WELCOME!!!" });
});


const usersModel = require("../users/usersModel");


server.get("/users", (req, res) => {});


module.exports = server