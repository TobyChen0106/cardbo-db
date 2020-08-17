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
        client.query(`SELECT * FROM cards WHERE cardname='${cardName}'`, async (err, res) => {
            try {
                if (err) {
                    console.log("getofferdata-by-cardname-and-bankname", err);
                    apiRes.json(err);
                } else {
                    let getDataFlag = false;
                    for (let i = 0; i < res.rows.length; ++i) {
                        const bankid = res.rows[i].bankid;
                        const { rows } = await client.query(`SELECT * FROM banks WHERE id='${bankid}'`).catch(err => { console.log(err); apiRes.json(err) });
                        if (!getDataFlag && rows && rows[0].bankname === bankName) {
                            getDataFlag = true;
                            const { rows } = await client.query(`SELECT * FROM offerdatas WHERE cardid='${res.rows[i].id}'`).catch(err => { console.log(err); apiRes.json(err) });
                            apiRes.json(rows[0]);
                            break;
                        }
                    }
                    if (!getDataFlag) apiRes.json(null);
                }
            } catch (e) {
                console.log(e);
            }
        });
    } else {
        apiRes.json("Api Key Error!");
    }
});

router.get('/getoffer-by-cardid', (apiReq, apiRes) => {
    const cardid = apiReq.query.cardid;
    if (apiReq.query.key === "mWLLtS6Z4DQwjD5Mvir3qe91ilenIPaLxbJWHPa06pnvP6ieQIDqlhBsah1ku828") {
        client.query(`SELECT * FROM offerdatas WHERE cardid='${cardid}'`, (err, res) => {
            if (err) {
                console.log("getoffer-by-cardid", err);
                apiRes.json(err);
            } else {
                apiRes.json(res.rows);
            }
        });
    } else {
        apiRes.json("Api Key Error!");
    }
});

router.get('/getuseractions', (apiReq, apiRes) => {
    const lineid = apiReq.query.lineid;
    const queryString = lineid ? `SELECT * FROM useractions WHERE lineid='${lineid}'` : `SELECT * FROM useractions`;
    if (apiReq.query.key === "AWQjK4NUqd4hnihC0HsEpszJuOpsThHsByXzDFMNcSPiWxCElQVgRP8o93Sj4sAs") {
        client.query(queryString, (err, res) => {
            if (err) {
                console.log("getuseractions", err);
                apiRes.json(err);
            } else {
                apiRes.json(res.rows);
            }
        });
    } else {
        apiRes.json("Api Key Error!");
    }
});

router.get('/getusers', (apiReq, apiRes) => {
    const lineid = apiReq.query.lineid;
    const queryString = lineid ? `SELECT * FROM users WHERE lineid='${lineid}'` : `SELECT * FROM users`;

    if (apiReq.query.key === "UtEQf3SsWgOSalrIpdkH0FJae1OmWknVVlGVw9a7asKWZd7w2qXMXcmlqSgBn2GI") {
        client.query(queryString, (err, res) => {
            if (err) {
                console.log("getusers", err);
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
    const cardid = apiReq.query.cardid;
    const queryString = cardid ? `SELECT * FROM cards WHERE id='${cardid}'` : `SELECT * FROM cards`;

    if (apiReq.query.key === "C5tyrugsa5M3qLYaPxvJ5QfqKiTIxAwem4Jz3vSbxKS73ZIzvCw6HJbsRoYer0cT") {
        client.query(queryString, async (err, res) => {
            if (err) {
                console.log("getcards", err);
                apiRes.json(err);
            } else {
                let cardData = res.rows;
                for (let i = 0; i < cardData.length; ++i) {
                    const { rows } = await client.query(`SELECT * FROM banks WHERE id='${cardData[i].bankid}'`);
                    cardData[i].bankname = await rows[0].bankname;
                    cardData[i].bankimage = await rows[0].bankimage;
                }
                apiRes.json(cardData);
            }
        });
    } else {
        apiRes.json("Api Key Error!");
    }
});

router.get('/getbanks', (apiReq, apiRes) => {
    const bankid = apiReq.query.bankid;
    const queryString = bankid ? `SELECT * FROM banks WHERE id='${bankid}'` : `SELECT * FROM banks`;
    if (apiReq.query.key === "B1a4TMjOe7VBeETcttvj1oSU6yJwHUMJdXURcITjH9Jor1viZCm1wzyUkQNwTuJ8") {
        client.query(queryString, (err, res) => {
            if (err) {
                console.log("getbanks", err);
                apiRes.json(err);
            } else {
                apiRes.json(res.rows);
            }
        });
    } else {
        apiRes.json("Api Key Error!");
    }
});

router.get('/getofferdatas', (apiReq, apiRes) => {
    const offerid = apiReq.query.offerid;
    const queryString = offerid ? `SELECT * FROM offerdatas WHERE id='${offerid}'` : `SELECT * FROM offerdatas`;

    if (apiReq.query.key === "6w3NcT2L1jz7dQRtXd8mGVzeO6xPgep0EsvPEbs9dme4pj3fcP6bfnYlXODsxJz8") {
        client.query(queryString, (err, res) => {
            if (err) {
                console.log("getofferdatas", err);
                apiRes.json(err);
            } else {
                apiRes.json(res.rows);
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
                    console.log("update-user", err);
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
                            const new_string = addCards.length > 0 ? `{${[...addCards]}}` : null;
                            if (new_string) queryString = queryString + `owncards=array_cat(owncards, '${new_string}'),`;
                        }
                        if (deleteCards) {
                            const new_string = deleteCards.length > 1 ? `{${[...deleteCards]}}` : deleteCards.length > 0 ? `${deleteCards[0]}` : null;
                            if (new_string) queryString = queryString + `owncards=array_remove(owncards, '${new_string}'),`;
                        }
                        queryString = queryString.slice(0, -1) + ` WHERE id='${userid}' RETURNING *`;
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

router.post('/insert-useraction', (apiReq, apiRes) => {
    const lineid = apiReq.body.lineid;
    const action = apiReq.body.action;
    const value = apiReq.body.value;

    if (lineid) {
        if (apiReq.query.key === "j5VAcaF9fWZfmJGqjh87fD81rZUo1pZUQ1QQCqo2NAv8wsca5dPeoGtbP9A3iEZe") {
            client.query(`INSERT INTO useractions(lineid, action, value) VALUES ('${lineid}', '${action}', '${value}') RETURNING *`, (err, res) => {
                if (err) {
                    console.log("insert-useraction", err);
                    apiRes.json(err);
                } else {
                    apiRes.json(res.rows[0]);
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