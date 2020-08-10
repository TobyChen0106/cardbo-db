const { Client, Pool } = require('pg')

const express = require("express");
const router = express.Router();

const pool = new Pool({
    user: 'awesdjzo',
    database: 'autopass-db',
    password: "kl;'",
});

pool.connect((err, client, done) => {
    if (err) throw err
    console.log("Pool Connected!");
});

router.get('/hi', (apiReq, apiRes) => {
    console.log(apiReq.location)
    pool.query('SELECT * FROM offerdatas', (err, res) => {
        // if (err) {
        //     // console.log(err);
        // } else {
        //     // console.log(res);
        //     apiRes.json(res);
        // }
        // pool.end();
    });
    
});

module.exports = router;