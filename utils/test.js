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

client.query(`UPDATE users SET owncards=null WHERE lineid='U1cdef6b4343c79712172aa8dd4a8ea93'`, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }

});