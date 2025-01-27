
const mongoose = require('mongoose')
const URL = "mongodb+srv://guptaatharva04:atharva1808@paymentapp.jnh24.mongodb.net/"
mongoose.connect(URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        MaxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type:Number,
        required: true
    }
});

const User = mongoose.model('User' , userSchema)
const Account = mongoose.model('Account', accountSchema)
module.exports = {
    User,
    Account,
};