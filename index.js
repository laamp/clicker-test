const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./config/keys').mongoURI;
const passport = require('passport');

const path = require('path');
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// routes
const players = require('./routes/api/players');

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

// routes
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/players', players);
