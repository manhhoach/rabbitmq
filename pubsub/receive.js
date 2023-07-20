const amqplib = require('amqplib');
const amqp_url = 'amqp://localhost:5672'

const receive = async () => {
    try {
        // create connection
        const connection = await amqplib.connect(amqp_url)

        // create channel
        const channel = await connection.createChannel()

        // create exchange
        const exchangeName = 'video'
        await channel.assertExchange(exchangeName, 'fanout', { durable: false })

        // create queue
        const { queue } = await channel.assertQueue('', { 
            exclusive: true // auto delete queue when not binding
         })
        console.log(queue);

        // binding queue to exchange, exchange will send message to all queues
        await channel.bindQueue(queue, exchangeName, '')

        // receive message from queue
        await channel.consume(queue, (msg) => {
            console.log(msg.content.toString());
        }, { noAck: true })

    } catch (error) {
        console.log(error);
    }
}

receive()