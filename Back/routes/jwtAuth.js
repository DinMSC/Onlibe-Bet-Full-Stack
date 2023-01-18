const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/infoValidation');
const checkToken = require('../middleware/checkJwtToken');

/* REGISTER USER */

router.post('/register', validInfo, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await pool.query(
            'SELECT * FROM users WHERE user_email = $1',
            [email]
        );

        if (user.rows.length !== 0) {
            return res.status(401).send('User Already Exists');
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, bcryptPassword]
        );
        const token = jwtGenerator({
            id: newUser.rows[0].user_id,
            name: newUser.rows[0].user_name,
            balance: newUser.rows[0].user_balance,
        });

        return res.json({ token });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

/* LOGIN USER */

router.post('/login', validInfo, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query(
            'SELECT * FROM users WHERE user_email = $1',
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(401).json('Wrong Password or Email');
        }

        const comparePass = await bcrypt.compare(
            password,
            user.rows[0].user_password
        );

        if (!comparePass) {
            return res.status(401).json(' Password or Email is Incorrect');
        }

        const token = jwtGenerator({
            id: user.rows[0].user_id,
            name: user.rows[0].user_name,
            balance: user.rows[0].user_balance,
        });

        res.json({ token });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
