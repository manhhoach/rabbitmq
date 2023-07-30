var amqp = require('amqplib/callback_api');
var exchange = 'direct_logs';
var args = process.argv.slice(2);
var msg = args.slice(1).join(' ') || 'Hello World!';
var severity = (args.length > 0) ? args[0] : 'info';

// cmd: node ./part4/send info "san pham moi ra mat"

amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertExchange(exchange, 'direct', { durable: false })
    channel.publish(exchange, severity, Buffer.from(msg));
    console.log('message has been sent');

    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 500);
  });
});