const mongoose = require('mongoose');

// tworzymy schemat w bazie danych

const CommentSchema = mongoose.Schema({
    comment_content: {
        type: String,
        required: true,
        default: "Treść komentarza"
    }
})

// linijka odpowiedzialna za eksport modelu nadajemy mu nazwę  Posts
// oraz nazwę schematu na podstawie jakiego jest tworzony

module.exports = mongoose.model('Comments', CommentSchema);