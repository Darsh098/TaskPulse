require('dotenv').config()
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tokens: [{
        token: String
    }]
});


// Generating Tokens
userSchema.methods.generateJWT = async function () {
    try {
        const authToken = jwt.sign({ _id: this._id.toString() }, process.env.SECRET);
        this.tokens = this.tokens.concat({ token: authToken });
        await this.save();
        return authToken;
    }
    catch (err) {
        res.send(`Error: ${err}`);
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
