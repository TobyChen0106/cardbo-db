const { Client, Pool } = require('pg')

const client = new Client({
    user: 'awesdjzo',
    database: 'autopass-db',
    password: "kl;'",
});

const pool = new Pool({
    user: 'awesdjzo',
    database: 'autopass-db',
    password: "kl;'",
});

pool.connect((err, client, done) => {
    if (err) throw err
    client.query('SELECT * FROM offerdatas', (err, res) => {
        done()
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0])
        }
    })
});