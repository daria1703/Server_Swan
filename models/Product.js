const mongoose = require('mongoose');

// tworzymy schemat w bazie danych

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "Przedmiot"
    },
    category: {
        type: String,
        required: true,
        default: "Przedmiot"
    },
    description: {
        type: String,
        required: true,
        default: "Opis"
    },
    price:{
        type: Number,
        required: true,
        default: 0
    },
    matter:{
        type: String,
        required: true,
        default: "Materiał"
    },
    assay:{
        type: Number,
        require: true,
        default: 0
    },
    size:{
        type: Number,
        require: true,
        default: 0
    },
    brand:{
        type: String,
        require: true,
        default: "Marka"
    },
    sex:{
        type: String,
        require: true,
        default: "Płeć"
    },
    img:{
        type: String,
        required: true,
        default: "https://www.parfois.com/dw/image/v2/BBKR_PRD/on/demandware.static/-/Sites-parfois-master-catalog/default/dw80180089/images/hi-res/212/52/183050_DM_1yf.jpg?sw=679&q=90"
    },
    quantity:{
        type: Number,
        require: true,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// linijka odpowiedzialna za eksport modelu nadajemy mu nazwę  Posts
// oraz nazwę schematu na podstawie jakiego jest tworzony

module.exports = mongoose.model('Products', ProductSchema);