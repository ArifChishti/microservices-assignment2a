const amqp = require('amqplib');

const sendMessage = async (queueName, message) => {
  let connection;
  try {
    // connection = await amqp.connect("amqp://localhost");
    connection = await amqp.connect("amqp://rabbitmq-service");
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: false });
    const bufferMessage = (Buffer.isBuffer(message))? message: Buffer.from(JSON.stringify(message))
    channel.sendToQueue(queueName, bufferMessage);
    console.log(" [%s] Sent '%s'", queueName, message);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
};

const receiveMessage = async (queueName, callback) => {
  try {
    // const connection = await amqp.connect("amqp://localhost");
    const connection = await amqp.connect("amqp://rabbitmq-service");
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();
    });

    await channel.assertQueue(queueName, { durable: false });

    callback ??= (message) => {
      if (message) {
        console.log(
          " [%s] Received '%s'",
          queueName,
          JSON.parse(message.content.toString())
        );
      }
    };

    await channel.consume(
      queueName,
      callback,
      { noAck: true }
    );

    console.log(" [*] Waiting for messages. To exit press CTRL+C");
  } catch (err) {
    console.warn(err);
  }
};

module.exports = {
  sendMessage,
  receiveMessage,
};
