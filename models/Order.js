const mongoose = require('mongoose');

// tworzymy schemat w bazie danych

const OrderSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true,
        default: "UserID"
    },
    amount: {
        type: Number,
        required: true,
        default: 0.0
    },
    address: {
        type: String, 
        required: true,
        default: "Address"
    },
    status:{
        type: String,
        default: "pending",
    },
    products: [
        {
            productId: {
                type: String,
                default: "ProductId"
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ]
},
    { timestamps: true }
)

// linijka odpowiedzialna za eksport modelu nadajemy mu nazwę  Posts
// oraz nazwę schematu na podstawie jakiego jest tworzony

module.exports = mongoose.model('Orders', OrderSchema);
