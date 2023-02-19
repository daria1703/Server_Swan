const mongoose = require('mongoose');


const VoucherSchema = mongoose.Schema({
    discount: {
        type: Number,
        default: 0.0,
        require: true
    },
    voucher_name: {
        type: String,
        default: "Rabat",
        require: true
    },
    voucher_code: {
        type: String,
        default: "2022R!",
        require: true
    }

})

module.exports = mongoose.model('Vouchers', VoucherSchema);