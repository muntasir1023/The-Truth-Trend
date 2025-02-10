const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3 // Added validation for minimum length
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Added validation for minimum length
    }
}, { timestamps: true }); // Added timestamps option

// Hash the password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
