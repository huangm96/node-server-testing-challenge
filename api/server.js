const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersModel = require("../users/usersModel");
const server = express();


server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "WELCOME!!!" });
});

server.get('/users', (req, res) => {
    usersModel.getAll().then(users => {
        res.status(200).json(users)
        }).catch(err => {
            res.status(500).json(err)
    })
})

server.post('/users', (req, res) => {
    usersModel.insert(req.body).then(user => {
        res.status(200).json(user)
    }).catch(err => {
        res.status(500).json(err)
    })
})







module.exports = server