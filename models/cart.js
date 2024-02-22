const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subSchema = require('./sub-schema-model');


const schema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        priceId: {
            type: String,
            required: true
        },
        selectedQty: {
            type: Number,
            required: true
        },
        igInfo:[subSchema.igInfo]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Cart', schema);
