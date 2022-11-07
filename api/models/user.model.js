const mongoose = require('mongoose');
require('mongoose-type-email');

const debtSchema = new mongoose.Schema ({
    dock: {
        type: Number,
        required: [true, 'Dock ist required']
    },
    cuantity: {
        type: Number,
        required: [true, 'Debt cuantity ist required']
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, 'Name too short'],
        maxLength: [20, 'Name too long']
    },
    dni: {
        type: String,
        required: [true, 'DNI required'],
        unique: [true, 'This DNI is registred'],
        minLength: [9, 'DNI too short'],
        maxLength: [9, 'DNI too long']
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: [true, 'Email required'],
        unique: [true, 'This email is registered']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['admin', 'owner'],
        default: 'owner'
    },
    ships: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ship'
    }],
    debt: {
        type: [debtSchema]
    }
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;