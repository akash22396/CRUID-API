const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', ({
    user_name: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
        unique: true

    },
    name: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,

    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        // lowercase: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password can not contain "Password"')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email id is not valid')
            }
        }

    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Age only a positive number')
            }
        }
    }
}))

module.exports = User;

/*
const me = new User({
    user_name: 'akash223',
    name: 'Akash Singh',
    password: 'akash.singh',
    email: 'akash@ts.com',
    age: 23

}) */
