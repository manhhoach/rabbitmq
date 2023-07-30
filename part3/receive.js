var amqp = require('amqplib/callback_api');
var exchange = 'logs';

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        channel.assertExchange(exchange, 'fanout', { durable: false });
        channel.assertQueue('', { exclusive: true }, (error, queue) => {
            channel.bindQueue(queue.queue, exchange, ''); // tham số thứ 3 là pattern
            channel.consume(queue.queue, function (msg) {
                console.log(queue);
                console.log(" Received %s", msg.content.toString());
                //   channel.ack(msg)
            }, { noAck: true });
        });


    });
});