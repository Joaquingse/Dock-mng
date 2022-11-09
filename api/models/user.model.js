const mongoose = require('mongoose');
require('mongoose-type-email');

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
        enum: ['admin', 'owner', 'worker'],
        default: 'owner'
    },
    ships: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ship'
    }],
    department: {
        type: String,
        enum: ['finances', 'RRHH', 'maintenance'],
        required: [function() {return this.role === 'worker'}, 'Department is required for workers']
    },
    active: {
        type: Boolean,
        required: [function() {return this.role === 'worker'}, 'Department is required for workers']
    }
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;