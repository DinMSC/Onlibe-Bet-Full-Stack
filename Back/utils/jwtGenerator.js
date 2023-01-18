const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtGenerator = ({ id, name, balance }) => {
    const payload = {
        id,
        name,
        balance,
    };
    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '1hr' });
};

module.exports = jwtGenerator;
