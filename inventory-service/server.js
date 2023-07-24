// imports
const express = require("express");
const morgan = require("morgan");
const { sendMessage } = require("../lib/rmq");

const DATA_SERVICE_QUEUE_NAME = "data";

// init express app
const app = express();

// use morgan middleware
app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World from inventory service");
});

// ! INVENTORY CRUD OPERATIONS
app.get("/inventory", (req, res) => {
  res.send("GET INVENTORY");
});

app.post("/inventory", (req, res) => {
  sendMessage(DATA_SERVICE_QUEUE_NAME, req.body);
  res.send("POST INVENTORY");
});

app.put("/inventory", (req, res) => {
  sendMessage(DATA_SERVICE_QUEUE_NAME, req.body);
  res.send("PUT INVENTORY");
});

app.delete("/inventory", (req, res) => {
  res.send("DELETE INVENTORY");
});

app.listen(5000);
