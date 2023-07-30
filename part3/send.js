var amqp = require('amqplib/callback_api');
var exchange = 'logs';
var msg = process.argv.slice(2).join(' ') || 'Hello World!';


amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    channel.assertExchange(exchange, 'fanout', { durable: false })
    channel.publish(exchange, '', Buffer.from(msg));
    console.log('message has been sent');
    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 500);
  });
});