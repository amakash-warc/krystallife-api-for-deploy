const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    readOnly: {
        type: Boolean,
        required: false
    },
    number: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: false
    },
    
}, {
    timestamps: true,
    versionKey: false
});


module.exports = mongoose.model('MobilePayment', schema);
