const mongoose = require('../config/database'); 
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'professor'], required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;