const mongoose = require('mongoose');

const shipSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ship name is required'],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Owner is required']
    },
    reg: {
        type: String,
        required: [true, 'Registration is required'],
        unique: [true, 'This registration exist already in database']
    }
})

const shipModel = mongoose.model('ship', shipSchema);
module.exports = shipModel;