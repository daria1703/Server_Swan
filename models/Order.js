const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"Users",
    }, 
    orderItems: [
        {
            name: {
                type:String,
                require: true,
            },
            qty:{
                type:Number,
                require: true,
            },
            image:{
                type:String,
                require: true,
            },
            price:{
                type:Number,
                require: true,
            },
            product:{
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref:"Products",
            },
        }
    ],
    shippingAdrdress:{
        address:{
            type:String,
            require: true,
        },
        city:{
            type:String,
            require: true,
        },
        postaCode:{
            type:String,
            require: true,
        },
        country:{
            type:String,
            require: true,
        },
    },
    paymentMethod:{
        type: String,
        require: true,
        default:"Paypal",
    },
    paymentResult:{
        id:{
            type: String
        },
        status:{
            type:String
        },
        update_time:{
            type:String
        },
        email_address:{
            type:String
        },
    },
    taxPrice:{
        type: Number,
        require: true,
        default:0.0,
    },
    isPaid:{
        type: Boolean,
        require: true,
        default:false,
    },
    paidAt:{
        type:Date
    },
    isDelivered:{
        type: Boolean,
        require: true,
        default:false,
    },
    deliveredAt:{
        type: Date,
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('Orders', OrderSchema);

