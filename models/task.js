const mongoose = require('mongoose')
const validator = require('validator')

const Tasks = mongoose.model('Tasks', ({
    description: {
        type: String,
        required: true,
        // minlength: 4,
        trim: true,
        // unique: true

    },
    status: {
        type: Boolean,
        default: false,
        // required: true,
        // minlength: 4,
        trim: true

    }
}))

module.exports = Tasks;