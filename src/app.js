require('dotenv').config();
const { json, urlencoded } = require('express');
const path = require("path");
const express = require('express');
const mongoose = require('mongoose');
require('./config/db-sql');
const cors = require('cors')
const app = express();

app.use(
    json({
        limit: '5mb'
    }),
    urlencoded({
        extended: false
    }),
    //cors()
);

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '186.224.88.163');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    cors();
    next();
});

app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

/* MongoDB connect */
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    () => console.log('MongoDB OK!')
);

/* Import Models */
const userModel = require('./models/user-model');

/* Import routes */
const indexRoutes = require('./routes/index-routes')
const authRoutes = require('./routes/auth-routes');

/* Use routes */
app.get('/', (req, res) => {
    res.send({
        'API': {
            status: 'working',
            version: 'v1.0.0'
        }
    });
});
app.use(indexRoutes);
app.use(authRoutes);

app.listen(process.env.PORT || process.env.LOCAL_PORT || 8090, (err) => {
    if (err) return console.log(err);
    console.log('App ok!');
});