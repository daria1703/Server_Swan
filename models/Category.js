const mongoose = require('mongoose');

// tworzymy schemat w bazie danych

const CategorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        default: "Kategoria"
    },
    subcategoryName: {
        type: String,
        require: true,
        default: "Podkategoria" 
    }
})

// linijka odpowiedzialna za eksport modelu nadajemy mu nazwę  Posts
// oraz nazwę schematu na podstawie jakiego jest tworzony

module.exports = mongoose.model('Category', CategorySchema);