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
    let secret = "51e8e2b52f2b4faa7f1fa2a94d4d881ffeda0c2bd9311b7a79c2a9513446c08d";
    try {
        const authToken = jwt.sign({ _id: this._id.toString() }, secret);
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
