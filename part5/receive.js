var amqp = require('amqplib/callback_api');
var exchange = 'topic_logs';

var args = process.argv.slice(2);

// cmd: node receive error warning .... 

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        channel.assertExchange(exchange, 'topic', { durable: false });

        channel.assertQueue('', { exclusive: true }, (error, queue) => {
            args.forEach(key => {

                channel.bindQueue(queue.queue, exchange, key);
            })

            channel.consume(queue.queue, function (msg) {
                console.log(" Received %s", msg.fields.routingKey, msg.content.toString());
            }, { noAck: true });
        });
    });
});