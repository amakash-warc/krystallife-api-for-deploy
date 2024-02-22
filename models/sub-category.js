const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subSchema = require('./sub-schema-model')

const schema = new Schema(
    {
        subCatName: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        parentCategory: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        parentCategoryName: {
            type: String,
            required: true
        },
        priceRange: {
            type: subSchema.range,
            required: false
        },
        filters: {
            type: [subSchema.filter],
            required: false
        },
        products: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }]
    }
)

module.exports = mongoose.model('SubCategory', schema);
