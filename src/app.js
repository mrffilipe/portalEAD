require('dotenv').config();
const { json, urlencoded } = require('express');
const path = require("path");
const express = require('express');
const mongoose = require('mongoose');
require('./config/db-sql');

const app = express();

app.use(
    json({
        limit: '5mb'
    }),
    urlencoded({
        extended: false
    })
);

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

/* MongoDB connect */
mongoose.connect(process.env.connectMongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    () => console.log('MongoDB OK!')
);

/* Import Models */
const userModel = require('./models/user-model');

/* Import routes */
const userRoute = require('./routes/user-route');
const myAccountRoute = require('./routes/myAccount-route');
const classListRoute = require('./routes/classList-route');
const classRoute = require('./routes/class-route');
const sendArchiveRoute = require('./routes/sendArchives-route');

/* Use routes */
app.use('/test', (req, res) => res.send('ok'));
app.use('/auth', userRoute);
app.use('/myAccount', myAccountRoute);
app.use('/classlist', classListRoute);
app.use('/class', classRoute);
app.use('/send', sendArchiveRoute);

app.listen(process.env.serverPORT || 8090, (err) => {
    if (err)
        return console.log(err);
    console.log('App ok!');
});