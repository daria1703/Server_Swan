const mongoose = require('mongoose');


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


module.exports = mongoose.model('Category', CategorySchema);