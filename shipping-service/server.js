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

// ! SHIPPING OPERATIONS
app.get("/shipping", (req, res) => {
  res.send("GET SHIPPING");
});

app.post("/shipping", (req, res) => {
  console.log(req.body);
  sendMessage(DATA_SERVICE_QUEUE_NAME, req.body)
  res.send("POST SHIPPING");
});

app.put("/shipping", (req, res) => {
  sendMessage(ORDERS_QUEUE_NAME, req.body)
  res.send("PUT SHIPPING");
});

app.delete("/shipping", (req, res) => {
  sendMessage(ORDERS_QUEUE_NAME, req.body)
  res.send("DELETE SHIPPING");
});


app.listen(5000);
