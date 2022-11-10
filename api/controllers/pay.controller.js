const Payments = require('../models/payment.model')

function getPayments(req, res) {
  Payments.find(req.query)
    .populate('owner')
    .then(payment => res.json(payment))
    .catch()
}

function getIncoming(req, res) {
    Payments.find({paid: true})
      .then(payments => {
        let thisMonth = new Date().getMonth()
        let thisYear = new Date().getFullYear()
        console.log(thisMonth)
        let monthPays = payments.filter(payment => (payment.payDate.getMonth() === thisMonth && payment.payDate.getFullYear() === thisYear))
        let monthInc = monthPays.reduce((prev, curr) => prev + curr.quantity, 0)
        res.json(monthInc)
      })
      .catch()
}

function getQueryInc(req, res) {
    Payments.find({paid: true})
      .then(payments => {
        let month = new Date(req.params.date).getMonth()
        let year = new Date(req.params.date).getFullYear()
        console.log(req.params.date)
        let monthPays = payments.filter(payment => (payment.payDate.getMonth() === month && payment.payDate.getFullYear() === year))
        let monthInc = monthPays.reduce((prev, curr) => prev + curr.quantity, 0)
        res.json(monthInc)
      })
      .catch()
}

module.exports = {
    getPayments,
    getIncoming,
    getQueryInc
}