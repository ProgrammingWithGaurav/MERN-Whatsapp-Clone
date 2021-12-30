import dotenv from 'dotenv';
dotenv.config()
// importing
import express from 'express';
import mongoose from 'mongoose';
import Message from './models/Message.js';
import Pusher from 'pusher';
import cors from 'cors';

// app config
const app = express();
const port = process.env.PORT || 5000

const pusher = new Pusher({
    appId: "1323618",
    key: "6116801065b3e3115d27",
    secret: "186dda0d000b01073fcf",
    cluster: "ap2",
    useTLS: true
  });

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

// DB config
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.once('open', () => {
    console.log('DB is connected')
    const msgCollection = db.collection('messages');
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log(change);

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            })
        } else {
            console.log('Error triggering Pusher');
        }
    })
})

// api routes
app.get('/', (req, res) => res.status(200).send('hello world'));

// Getting all messages
app.get('/messages/sync', (req, res) => {
    Message.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// Add a new message
app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;
    Message.create(dbMessage, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

// listen
app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})