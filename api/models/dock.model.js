const mongoose = require('mongoose');

const dockSchema = new mongoose.Schema({
    dock: {
        type: Number,
        unique: [true, 'This dock already exists'],
        required: [true, 'Dock number required']
    },
    occuppied: {
        type: Boolean,
        default: false
    },
    ship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ship',
        unique: true,
        required: [function() {return this.occuppied === true}, 'Occuppied dock requires ship data']
    },
    checkin: {
        type: Date,
        required: [function() {return this.occuppied === true}, 'Occuppied dock requires check-in data']
    },
    checkout: {
        type: Date,
        required: [function() {return this.occuppied === true}, 'Occuppied dock requires check-out data']
    }   
})

const dockModel = mongoose.model('dock', dockSchema);
module.exports = dockModel;