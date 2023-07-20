const amqplib = require('amqplib');
const amqp_url = 'amqp://localhost:5672'

const postVideo = async (msg) => {
    try {
        // create connection
        const connection = await amqplib.connect(amqp_url)

        // create channel
        const channel = await connection.createChannel()

        // create exchange
        const exchangeName = 'video'
        await channel.assertExchange(exchangeName, 'fanout', { durable: false })

        // publish message to exchange
        await channel.publish(exchangeName, '', Buffer.from(msg))
        console.log(`sent ${msg}`);

        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 2000)

    } catch (error) {
        console.log(error);
    }
}

postVideo('chào cụ mạnh')