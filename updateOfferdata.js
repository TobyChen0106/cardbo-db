const { Client, Pool } = require('pg')
const offerdatas_new = require('./offerdatas_new.json')

const client = new Client({
    user: 'awesdjzo',
    database: 'autopass-db',
    password: "kl;'",
});

client.connect((err, client, done) => {
    if (err) throw err
    console.log("Database Connected!");
});

client.query(`SELECT * FROM offerdatas`, (err, res) => {
    if (err) {
        console.log(err);
    } else {

        for (let i = 0; i < res.rows.length; ++i) {
            for (let j = 0; j < offerdatas_new.length; ++j) {
                if(res.rows[i].id === offerdatas_new[j].id){
                    msg = `UPDATE offerdatas SET parkinglot='{${ offerdatas_new[j].parkinglot}}', deeplink='${ offerdatas_new[j].deeplink}'  WHERE id='${res.rows[i].id}' RETURNING * `
                    console.log(msg)
                    client.query(msg, (inserUsererr, inserUserres) => {
                        if (inserUsererr) {
                            console.log(inserUsererr);
                        } else {
                            console.log(inserUserres.rows[0]);
                        }
                    });
                }
            }
        }
    }
});