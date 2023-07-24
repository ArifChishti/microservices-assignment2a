const { sendMessage, receiveMessage } = require("../lib/rmq");

const WEBHOOK_QUEUE_NAME = "webhook";
const DATA_SERVICE_QUEUE_NAME = "data";
const ORDERS_QUEUE_NAME = "orders";

const messageCallback = (message) => {
  if (message) {
    console.log(
      " [data-service] Received '%s' in queue '%s",
      JSON.parse(message.content.toString()),
      DATA_SERVICE_QUEUE_NAME,
    );
    sendMessage(WEBHOOK_QUEUE_NAME, message.content);
  } 
};
receiveMessage(DATA_SERVICE_QUEUE_NAME, messageCallback);
receiveMessage(ORDERS_QUEUE_NAME, messageCallback);
