const { Client, Pool } = require('pg')
const fs = require('fs');
const new_cards = require('./cards_new.json');
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

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


client.connect((err, client, done) => {
    if (err) throw err
    console.log("Database Connected!");
});

client.query(`SELECT * FROM cards`, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        for (let i = 0; i < res.rows.length; ++i) {
            let cardimage = "";
            for (let j = 0; j < new_cards.length; ++j) {
                if(new_cards[j].id === res.rows[i].id){
                    cardimage = new_cards[j].cardimage
                }
            }

            client.query(`UPDATE cards SET cardimage='${cardimage}'  WHERE id='${res.rows[i].id}' RETURNING * `, (inserUsererr, inserUserres) => {
                if (inserUsererr) {
                    console.log(inserUsererr);
                } else {
                    console.log(inserUserres.rows[0]);
                }
            });
        }
        // console.log(cards);
        // fs.writeFile("cards.json", JSON.stringify(res.rows), 'utf8', () => console.log(`successfully dump cards`)) 
    }
});