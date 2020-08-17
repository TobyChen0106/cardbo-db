const { Client, Pool } = require('pg')
const express = require('express');
var cors = require('cors');

const path = require('path');
const port = process.env.PORT || 80;
const app = express();
var bodyParser = require('body-parser')
const apiRoute = require('./autopass-api');

app.use(cors());
app.use(bodyParser.json())
app.use('/autopass-api', apiRoute);

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.listen(port);