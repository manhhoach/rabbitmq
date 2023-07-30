var amqp = require('amqplib/callback_api');
var queue = 'task_queue';

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1); // mỗi consumer có thể nhận và xử lý cùng lúc 1 msg trước khi phải gửi xác nhận cho RabbitMQ.

        channel.consume(queue, function (msg) {
            console.log(" Received %s", msg.content.toString());
            channel.ack(msg)
        }, { noAck: false });
    });
});