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
    in: {
        type: Date,
        required: [function() {return this.occuppied === true}, 'Occuppied dock requires check-in data']
    },
    out: {
        type: Date,
        required: [function() {return this.occuppied === true}, 'Occuppied dock requires check-out data']
    },
    aboned: {
        type: Boolean,
        required: [function() {return this.occuppied === true}, 'Occuppied dock requires payment data']
    }    
})

const dockModel = mongoose.model('dock', dockSchema);
module.exports = dockModel;