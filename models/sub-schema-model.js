const mongoose = require('mongoose');
const Schema = mongoose.Schema;


exports.orderItem = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        discountType: {
            type: Number,
            required: false
        },
        discountAmount: {
            type: Number,
            required: false
        },
        quantity: {
            type: Number,
            required: true
        },
        orderType: {
            type: String,
            required: true
        },
        unitType: {
            type: String,
            required: true
        },
        additionalInfo:[[this.igInfo]]
    },
    {
        _id: true
    }
);

exports.priceWithUnit = new Schema(
    {
        unit: {
            type: Schema.Types.ObjectId,
            ref: 'UnitType'
        },
        price: {
            type: Number,
            required: true
        },
        discountType: {
            type: Number,
            required: false
        },
        discountAmount: {
            type: Number,
            required: false
        },
        quantity: {
            type: Number,
            required: false
        },
        soldQuantity: {
            type: Number,
            required: false
        },
    },
    {
        _id: true
    }
);
exports.inputFeildsSchema = new Schema(
    {
        label:{
            type:String,
            required:true,
        },
        placeholder:{
            type: String,
            required:true,
        },
        value:{
            type:String
        }
    }
)
/* exports.igInfo = new Schema(
    {
        fieldName:{
            type:String,
            required:true,
        },
        info:{
            type: String,
            required:true,
        }
    }
) */
exports.discussionReply = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        replyDate: {
            type: Date,
            required: false
        },
        profileImage: {
            type: String,
            required: false
        },
        isAdmin: {
            type: Boolean,
            required: false
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false
        },
        comment: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        },
        vote: {
            type: Number,
            required: false
        },
        reply: {
            type: [Object],
            required: false
        },
    },
    {
        _id: true
    }
);

exports.igInfo = new Schema(
    {
        fieldName:{
            type:String
        },
        /* gameName:{
            type:String
        }, */
        info:{
            type:String
        }
    }
)
