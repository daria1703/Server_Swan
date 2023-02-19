const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    comment_content: {
        type: String,
        required: true,
        default: "Treść komentarza"
    }
})


module.exports = mongoose.model('Comments', CommentSchema);