const mongoose = require('mongoose');

// tworzymy schemat w bazie danych

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Imię"
    },
    lastName: {
        type: String,
        require: true,
        default: "Nazwisko" 
    },
    email: {
        type: String,
        required: true,
        default: "email@gmail.com"
    },
    password: {
        type: String,
        required: true,
        default: "brak"
    },
    img: {
        type: String,
        require: true,
        default: "https://i.pinimg.com/564x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"
    },
    date: {
        type: Date,
        default: Date.now
    },
    sex:{
        type: String,
        require: true,
        default: "Płeć"
    },
})

// linijka odpowiedzialna za eksport modelu nadajemy mu nazwę  Posts
// oraz nazwę schematu na podstawie jakiego jest tworzony

module.exports = mongoose.model('Users', UserSchema);