const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Your user model

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.userId });

        if (!user || user.role !== 'admin') {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Admin authentication failed.' });
    }
};

module.exports = adminAuth;