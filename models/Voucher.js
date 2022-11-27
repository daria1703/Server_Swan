const mongoose = require('mongoose');

// tworzymy schemat w bazie danych

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

// linijka odpowiedzialna za eksport modelu nadajemy mu nazwę  Posts
// oraz nazwę schematu na podstawie jakiego jest tworzony

module.exports = mongoose.model('Vouchers', VoucherSchema);