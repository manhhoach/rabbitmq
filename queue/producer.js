const amqplib = require('amqplib');
const amqp_url = 'amqp://localhost:5672'

const sendQueue = async (msg) => {
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

        // send to queue
        await channel.sendToQueue(nameQueue, Buffer.from(msg),{
            persistent: true
            //expiration: 10*1000
        })


    } catch (error) {
        console.log(error);
    }
}

sendQueue('chao anh manh')