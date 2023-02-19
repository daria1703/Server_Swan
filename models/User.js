const mongoose = require('mongoose');


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
        default: "email@gmail.com",
        unique: true
    },
    password: {
        type: String,
        required: true,
        default: "brak"
    },
    isLogged: {
        type: Boolean,
        required: true,
        default: false
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

    reEnteredPassword: {
        type: String,
        require: true,
        default: "brak"
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    
},
    { timestamps: true }
)

module.exports = mongoose.model('Users', UserSchema);

