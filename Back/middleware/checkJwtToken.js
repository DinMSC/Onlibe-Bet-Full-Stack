const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = (req, res, next) => {
    try {
        const jwtToken = req.header('authorization')?.split(' ')[1];
        if (!jwtToken) {
            return res.status(403).json('Not Authorised');
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = {
            id: payload.id,
            name: payload.name,
            balance: payload.balance,
        };
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(403).json('Not Authorised');
    }
};
