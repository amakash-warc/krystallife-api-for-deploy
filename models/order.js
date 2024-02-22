const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderItem = require('./OrderItem');

const schema = new Schema(
    {
        orderId: {
            type: String,
            required: false,
            unique: true
        },
        checkoutDate: {
            type: Date,
            required: true
        },

        deliveryDate: {
            type: Date,
            required: false
        },

        deliveryStatus: {
            type: Number,
            required: true
        },

        // Amount Area
        subTotal: {
            type: Number,
            required: true
        },
        shippingFee: {
            type: Number,
            required: false
        },
        discount: {
            type: Number,
            required: false
        },
        totalAmount: {
            type: Number,
            required: true
        },
       
        paymentMethod: {
            type: String,
            required: true
        },
        
        orderItems:[orderItem],
        // User Address
      
        name: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false
        },
        alternativePhoneNo: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        district: {
            type: String,
            required: false
        },
        area: {
            type: String,
            required: false
        },
        shippingAddress: {
            type: String,
            required: false
        },

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Order', schema);
