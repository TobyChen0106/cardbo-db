const { Client, Pool } = require('pg')

const client = new Client({
    user: 'awesdjzo',
    database: 'autopass-db',
    password: "kl;'",
});

client.connect((err, client, done) => {
    if (err) throw err
    console.log("Database Connected!");
});

// client.query(`SELECT * FROM users`, (err, res) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(res.rows)
//     }
// });
client.query(`DELETE FROM users WHERE lineid='U6e3fe6d3b8879a762a1b956e09cd6b22'`, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(res)
    }
});