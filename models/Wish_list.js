const mongoose = require('mongoose');

// tworzymy schemat w bazie danych

const WishSchema = mongoose.Schema({
    wish_list_name: {
        type: String,
        required: true,
        default: "Lista życzeń"
    }
})

// linijka odpowiedzialna za eksport modelu nadajemy mu nazwę  Posts
// oraz nazwę schematu na podstawie jakiego jest tworzony

module.exports = mongoose.model('Wish_lists', WishSchema);