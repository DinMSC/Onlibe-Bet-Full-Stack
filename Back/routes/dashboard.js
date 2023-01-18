const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/checkJwtToken');
const lodash = require('lodash');

router.get('/', auth, async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.post('/create-event', async (req, res) => {
    try {
        const { type, odds, names } = req.body;
        const options = type === 'football' ? '[1, 2, 3]' : '[1,2]';
        if (type === 'football' && odds.length !== 3) throw Error('Bad data!');
        if (type === 'tennis' && odds.length !== 2) throw Error('Bad data!');
        const event = await pool.query(
            `INSERT INTO events (type, options, odds, names) VALUES('${type}', ARRAY ${options}, ARRAY ${JSON.stringify(
                odds
            )},ARRAY ${JSON.stringify(names).replaceAll(
                '"',
                "'"
            )}) RETURNING event_id, type, options, odds, names`
        );
        res.send(event.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.get('/events', async (req, res) => {
    try {
        const event = await pool.query('SELECT * FROM events');
        res.send(event.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.get('/to-ticket', async (req, res) => {
    try {
        const { events } = req.body;
        console.log(JSON.stringify(events).replaceAll('"', "'"));
        const ticket = await pool.query(
            `INSERT INTO tickets(events) VALUES(ARRAY ${JSON.stringify(
                events
            ).replaceAll('"', "'")}) RETURNING events`
        );
        res.send(ticket.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;
