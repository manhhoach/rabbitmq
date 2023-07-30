var amqp = require('amqplib/callback_api');
var exchange = 'direct_logs';

var args = process.argv.slice(2);

if (args.length == 0) {
    console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
    process.exit(1);
}
console.log(args);

// cmd: node receive error warning .... 

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        channel.assertExchange(exchange, 'direct', { durable: false });

        channel.assertQueue('', { exclusive: true }, (error, queue) => {
            args.forEach(severity => {

                channel.bindQueue(queue.queue, exchange, severity);
            })

            channel.consume(queue.queue, function (msg) {
                console.log(" Received %s", msg.content.toString());
            }, { noAck: true });
        });
    });
});