const amqplib = require('amqplib');
const amqp_url = 'amqp://localhost:5672'

const receiveQueue = async () => {
    try {
        // create connection
        const connection = await amqplib.connect(amqp_url)

        // create channel
        const channel = await connection.createChannel()

        // create queue
        const nameQueue = 'q2'
        await channel.assertQueue(nameQueue, {
            durable: true
        })

        // receive message from queue
        channel.consume(nameQueue, (msg) => {
            console.log(msg.content.toString())
        }, {
            noAck: true
        })


    } catch (error) {
        console.log(error);
    }
}

receiveQueue()