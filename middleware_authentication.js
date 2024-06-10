const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = await User.findById(decoded.id).select('-password');
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isSystemUser) {
        next();
    } else {
        res.sendStatus(403);
    }
};

module.exports = {
    authenticateJWT,
    isAdmin,
};