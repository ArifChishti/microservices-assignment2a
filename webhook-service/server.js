// imports
const { receiveMessage } = require("../lib/rmq");

const WEBHOOK_QUEUE_NAME = "webhook";

receiveMessage(WEBHOOK_QUEUE_NAME, (message) => {
  if (message) {
    console.log(
      " [webhook-service] Received '%s' in '%s queue",
      message.content.toString(),
      WEBHOOK_QUEUE_NAME,
    );
  }
});

