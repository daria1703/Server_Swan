const mongoose = require('mongoose');

// tworzymy schemat w bazie danych

const OrderSchema = mongoose.Schema({
    date_of_order: {
        type: Date,
        default: Date.now,
        require: true
    },

    isAccepted: {
        type: Boolean,
        default: false,
        require: true
    },

    isCompleted: {
        type: Boolean,
        default: false,
        require: true
    },

    isVoucher: {
        type: Boolean,
        default: false,
        require: true
    },

})

// linijka odpowiedzialna za eksport modelu nadajemy mu nazwę  Posts
// oraz nazwę schematu na podstawie jakiego jest tworzony

module.exports = mongoose.model('Orders', OrderSchema);