const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    service_access_username: {
        type: String,
        required: true
    },
    service_access_password: {
        type: String,
        required: true
    },
    merchant_id: {
        type: String,
        required: true
    },
    access_app_key: {
        type: String,
        required: true
    },
    wmx_id: {
        type: String,
        required: true
    },
    app_name: {
        type: String,
        required: true
    },
    cart_info: {
        type: String,
        required: true
    },
    options: {
        type: String,
        required: true
    },
    saved_merchant_txn_data: [{
        type: Object,
        required: false
    }]
});


module.exports = mongoose.model('Paymentinfo', schema);
