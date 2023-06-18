require('dotenv').config();
const jwt = require('jsonwebtoken');

const authorize = async (req, res, next) => {
    const header = req.headers['authorization'];
    if (!header) return res.sendStatus(401);

    const token = header.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, (error, data) => {
        if (error) return res.sendStatus(403);
        req.user = data;
        next();
    })
}

module.exports = authorize;