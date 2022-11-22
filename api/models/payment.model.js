const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paid: {
        type: Boolean,
        default: false
    },
    quantity: {
        type: Number,
        required: [true, 'Debt quantity is required']
    },
    dock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dock',
        required: [true, 'Dock\'s number is required to pay or reserve']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User data are required to pay or reserve']
    },
    resDate: {
        type: Date,
        required: [true, 'Reservation date is required']
    },
    inDate: {
        type: Date,
        required: [true, 'Incomming date is required for reservation']
    },
    outDate: {
        type: Date,
        required: [true, 'Outcomming date is required for reservation']
    },
    payDate: {
        type: Date,
        required: [function() {return this.paid === true}, 'Payment date is required']
    }
    
})

const paymentModel = mongoose.model('payment', paymentSchema);
module.exports = paymentModel;