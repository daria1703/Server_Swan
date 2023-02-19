const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    rating: {
        type: Number,
        require: true
    },
    comment:{
        type: String,
        require: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"Users",
    } 
})

const ProductSchema = mongoose.Schema({
    product_name : {
        type: String,
        required: true,
        default: "Item"
    },
    
    category: {
        type: Array,
        required: true,
        default: "Category"
    },
    description: {
        type: String,
        required: true,
        default: "Description"
    },
    short_description: {
        type: String,
        required: true,
        default: "Short description"
    },
    matter:{
        type: String,
        required: true,
        default: "Material"
    },
    reviews: [ReviewSchema],
    rating:{
        type: Number,
        require: true,
        default: 0,
    },
    numReviews:{
        type:Number,
        require: true,
        default:0,
    },
    assay:{
        type: Array,
        require: true,
        default: 0
    },
    size:{
        type: Array,
        require: true,
        default: 0
    },
    brand:{
        type: String,
        require: true,
        default: "Brand"
    },
    img:{
        type: String,
        required: true,
        default: "https://www.parfois.com/dw/image/v2/BBKR_PRD/on/demandware.static/-/Sites-parfois-master-catalog/default/dw80180089/images/hi-res/212/52/183050_DM_1yf.jpg?sw=679&q=90"
    },
    quantity:{
        type: Number,
        require: true,
        default: 0.0
    },
    net_price: {
        type: Number,
        default: 0.0
    },
    gross_price: {
        type: Number,
        required: true,
        default: 0.0
    },
    weight: {
        type: Number,
        required: true,
        default: 0.0
    },
    vat: {
        type: Number,
        required: true,
        default: 0.23
    }
},
{ timestamps: true }
)

module.exports = mongoose.model('Products', ProductSchema);