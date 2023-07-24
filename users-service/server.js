// imports
const express = require("express");
const morgan = require("morgan");
const { sendMessage, receiveMessage } = require("../lib/rmq");

const DATA_SERVICE_QUEUE_NAME = "data";

// init express app
const app = express();

// use morgan middleware
app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  sendMessage(DATA_SERVICE_QUEUE_NAME, req.body)
  res.send("Hello World");
});

// ! USERS CRUD OPERATIONS
app.get("/users", (req, res) => {
  sendMessage(DATA_SERVICE_QUEUE_NAME, req.body)
  res.send("GET USERS");
});

app.post("/users", (req, res) => {
  sendMessage(DATA_SERVICE_QUEUE_NAME, req.body)
  res.send("POST USERS");
});

app.put("/users", (req, res) => {
  sendMessage(DATA_SERVICE_QUEUE_NAME, req.body)
  res.send("PUT USERS");
});

app.delete("/users", (req, res) => {
  sendMessage(DATA_SERVICE_QUEUE_NAME, req.body)
  res.send("DELETE USERS");
});

app.listen(5000);
