// imports
const express = require("express");
const morgan = require("morgan");
const { sendMessage } = require("../lib/rmq");

const ORDERS_QUEUE_NAME = "orders";

// init express app
const app = express();

// use morgan middleware
app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// ! ORDER OPERATIONS
app.get("/order", (req, res) => {
  res.send("GET ORDER");
});

app.post("/order", (req, res) => {
  console.log(req.body);
  sendMessage(ORDERS_QUEUE_NAME, req.body);
  res.send("POST ORDER");
});

app.put("/order", (req, res) => {
  sendMessage(ORDERS_QUEUE_NAME, req.body);
  res.send("PUT ORDER");
});

app.delete("/order", (req, res) => {
  res.send("DELETE ORDER");
});

app.listen(5000);
