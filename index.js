const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./config/keys').mongoURI;

// connect to MongoDB using Mongoose
mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Successfully connected to Mongo database'))
    .catch(err => console.log(err));

// message when server is running
app.listen(port, () =>
    console.log(`Clicker server is running on port ${port}`)
);

// test route
app.get("/", (req, res) => res.send('Hello, world.'));