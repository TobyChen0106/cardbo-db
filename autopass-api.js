const { Client, Pool } = require('pg')

const express = require("express");
const router = express.Router();

const client = new Client({
    user: 'awesdjzo',
    database: 'autopass-db',
    password: "kl;'",
});

client.connect((err, client, done) => {
    if (err) throw err
    console.log("Database Connected!");
});

router.get('/getofferdata-by-cardname-and-bankname', (apiReq, apiRes) => {
    const cardName = apiReq.query.cardname;
    const bankName = apiReq.query.bankname;

    if (apiReq.query.key === "N1xRDtNwRilzH5J6Y2OMbnel5ZLzEAoFOvUS7hiFO60mh1lxnOieXmRzO00zAHUT") {
        client.query(`SELECT * FROM cards WHERE cardname='${cardName}'`, (err, res) => {
            if (err) {
                console.log(err);
                apiRes.json(err);
            } else {
                for (let i = 0; i < res.rows.length; ++i) {
                    const bankid = res.rows[i].bankid;
                    client.query(`SELECT * FROM banks WHERE id='${bankid}'`, (bank_err, bank_res) => {
                        if (bank_err) {
                            console.log(bank_err);
                            apiRes.json(bank_err);
                        } else {
                            if (bank_res.rows[0].bankname === bankName) {
                                client.query(`SELECT * FROM offerdatas WHERE cardid='${res.rows[i].id}'`, (offer_err, offer_res) => {
                                    if (offer_err) {
                                        console.log(offer_err);
                                        apiRes.json(offer_err);
                                    } else {
                                        apiRes.json(offer_res.rows[0]);
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    } else {
        apiRes.json("Api Key Error!");
    }
});

router.get('/getusers', (apiReq, apiRes) => {
    if (apiReq.query.key === "JPT6RFfAxOPzfm640HOxb7l7IIlJeLQwSqIkilgORUmg3vkafacl8C5MKNn1bZ9P") {
        client.query(`SELECT * FROM users`, (err, res) => {
            if (err) {
                console.log(err);
                apiRes.json(err);
            } else {
                apiRes.json(res.rows);
            }
        });
    } else {
        apiRes.json("Api Key Error!");
    }
});

router.get('/getcards', (apiReq, apiRes) => {
    if (apiReq.query.key === "C5tyrugsa5M3qLYaPxvJ5QfqKiTIxAwem4Jz3vSbxKS73ZIzvCw6HJbsRoYer0cT") {
        client.query(`SELECT * FROM cards`, async (err, res) => {
            if (err) {
                console.log(err);
                apiRes.json(err);
            } else {
                let cardData = res.rows;
                for (let i = 0; i < cardData.length; ++i) {
                    const { rows } = await client.query(`SELECT * FROM banks WHERE id='${cardData[i].bankid}'`);
                    cardData[i].bankname = await rows[0].bankname;
                    cardData[i].bankimage = await rows[0].bankimage;
                }
                 console.log(cardData);
                 apiRes.json(cardData);
            }
        });
    } else {
        apiRes.json("Api Key Error!");
    }
});

router.get('/getbanks', (apiReq, apiRes) => {
    if (apiReq.query.key === "B1a4TMjOe7VBeETcttvj1oSU6yJwHUMJdXURcITjH9Jor1viZCm1wzyUkQNwTuJ8") {
        client.query(`SELECT * FROM banks`, (err, res) => {
            if (err) {
                console.log(err);
                apiRes.json(err);
            } else {
                apiRes.json(res.rows);
            }
        });
    } else {
        apiRes.json("Api Key Error!");
    }
});

router.get('/getuser-by-lineid', (apiReq, apiRes) => {
    const lineid = apiReq.query.lineid;
    if (lineid && apiReq.query.key === "UtEQf3SsWgOSalrIpdkH0FJae1OmWknVVlGVw9a7asKWZd7w2qXMXcmlqSgBn2GI") {
        client.query(`SELECT * FROM users WHERE lineid='${lineid}'`, (err, res) => {
            if (err) {
                console.log(err);
                apiRes.json(err);
            } else {
                apiRes.json(res.rows[0]);
            }
        });
    } else {
        apiRes.json("Api Key Error!");
    }
});


router.post('/update-user', (apiReq, apiRes) => {
    const lineid = apiReq.body.lineid;
    const email = apiReq.body.email;
    const displayName = apiReq.body.displayName;
    const addCards = apiReq.body.addCards;
    const deleteCards = apiReq.body.deleteCards;

    if (lineid) {
        if (apiReq.query.key === "UPEvbZ8dPPc7JABil1FVvnufbMniK9dTs3JFMq6wm2kXx6WQ53Pd5boftdzNka0T") {
            client.query(`SELECT * FROM users WHERE lineid='${lineid}'`, (err, res) => {
                if (err) {
                    console.log(err);
                    apiRes.json(err);
                } else {
                    if (res.rows.length === 0) {
                        client.query(`INSERT INTO users(lineid, displayname, email) VALUES ('${lineid}', '${displayName}', '${email}') RETURNING *`, (inserUsererr, inserUserres) => {
                            if (inserUsererr) {
                                console.log(inserUsererr);
                                apiRes.json(inserUsererr);
                            } else {
                                apiRes.json(inserUserres.rows[0]);
                            }
                        });
                    } else {
                        const userid = res.rows[0].id;
                        let queryString = `UPDATE users SET `;
                        if (email) {
                            queryString = queryString + `email='${email}',`;
                        }
                        if (displayName) {
                            queryString = queryString + `displayName='${displayName}',`;
                        }
                        if (addCards) {
                            const new_string = addCards.length > 1 ? `{${[...addCards]}}` : addCards.length > 0 ? `${addCards[0]}` : null;
                            if (new_string) queryString = queryString + `owncards=array_cat(owncards, '${new_string}'),`;
                        }
                        if (deleteCards) {
                            const new_string = deleteCards.length > 1 ? `{${[...deleteCards]}}` : deleteCards.length > 0 ? `${deleteCards[0]}` : null;
                            if (new_string) queryString = queryString + `owncards=array_remove(owncards, '${new_string}'),`;
                        }
                        queryString = queryString.slice(0, -1) + ` WHERE id='${userid}' RETURNING *`;
                        // console.log(queryString);
                        client.query(queryString, (inserUsererr, inserUserres) => {
                            if (inserUsererr) {
                                console.log(inserUsererr);
                                apiRes.json(inserUsererr);
                            } else {
                                apiRes.json(inserUserres.rows[0]);
                            }
                        });
                    }
                }
            });
        } else {
            apiRes.json("Api Key Error!");
        }
    } else {
        apiRes.json("User Line ID Error!");
    }
});

module.exports = router;