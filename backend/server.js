import dotenv from 'dotenv';
dotenv.config()
// importing
import express from 'express';
import mongoose from 'mongoose';
import Message from './models/Message.js';

// app config
const app = express();
const port = process.env.PORT || 5000

// middleware
app.use(express.json());

// DB config
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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