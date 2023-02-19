const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    locality: {
        type: String,
        required: true,
        default: "Miejscowość"
    },
    zipCode: {
        type: String,
        require: true,
        default: "brak" 
    },
    street: {
        type: String,
        required: true,
        default: "brak"
    },
    houseNumber: {
        type: String,
        required: true,
        default: "brak"
    },
    apartment_number: {
        type: String,
        required: true,
        default: "brak"
    }
})

module.exports = mongoose.model('Address', AddressSchema);