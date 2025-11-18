import { Queue } from './queue.js';

import express from 'express';

const app = express();

const queue = new Queue()

// ! sample get endpoint
app.get('/', rateLimiterMiddleware, handleRequest);

async function handleRequest(req, res) {
    await sleep(5000);

    res.send({ message: 'This is some data.' });

    queue.removeFirst()

    console.log("Finish serving client")

    if (queue.getLength() === 0) {
        return;
    }

    const nextClient = queue.getNextClient()

    const { req: nextClientReq, res: nextClientRes } = nextClient

    console.log("Init serving next client")

    handleRequest(nextClientReq, nextClientRes);
}

function rateLimiterMiddleware(req, res, next) {
    queue.add({ req, res })

    if (queue.getLength() === 1) {
        return next()
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms)
    })
}

app.listen(9000, () => {
    console.log('Server is running on port 9000');
});