const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET);

        const u = await User.findOne({ _id: verifyUser._id });
        console.log("User:\n" + u);
        next();
    }
    catch (err) {
        res.redirect('/');
        // res.status(401).send(err);
    }
}

module.exports = auth;