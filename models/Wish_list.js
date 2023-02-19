const mongoose = require('mongoose');

const WishSchema = mongoose.Schema({
    wish_list_name: {
        type: String,
        required: true,
        default: "Lista życzeń"
    }
})


module.exports = mongoose.model('Wish_lists', WishSchema);