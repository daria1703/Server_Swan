const mongoose = require('mongoose');

// tworzymy schemat w bazie danych

const CartSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
},
    { timestamps: true }
)

// linijka odpowiedzialna za eksport modelu nadajemy mu nazwę  Posts
// oraz nazwę schematu na podstawie jakiego jest tworzony

module.exports = mongoose.model('Cart', CartSchema);