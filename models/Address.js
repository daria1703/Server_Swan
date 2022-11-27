const mongoose = require('mongoose');

// tworzymy schemat w bazie danych

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

// linijka odpowiedzialna za eksport modelu nadajemy mu nazwę  Posts
// oraz nazwę schematu na podstawie jakiego jest tworzony

module.exports = mongoose.model('Address', AddressSchema);