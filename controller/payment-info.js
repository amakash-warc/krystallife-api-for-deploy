// Require Main Modules..
const btoa = require('btoa');
const {validationResult} = require('express-validator');

// Require Post Schema from Model..
const PaymentInfo = require('../models/payment-info');
const Order = require('../models/order');
const { orderItem } = require('../models/sub-schema-model');
const User = require('../models/user');

exports.addPaymentInfo = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    // if(typeof(req.body.cart_info)==='string'){
    //     req.body.cart_info = req.body.cart_info.split(/[ ,]+/);
    // }

    const data = req.body;
    data.options = btoa(data.options);

    const paymentInfo = new PaymentInfo(data);

    try {

        await paymentInfo.save();
        res.status(200).json({
            message: 'Payment Info Added Successfully!'
        });
    } catch (err) {
        // console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getPaymentInfo = async (req, res, next) => {

    const paymentInfo = await PaymentInfo.findOne();

    try {
        res.status(200).json({
            data: paymentInfo
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.updatePaymentInfo = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    try {
        const id = req.body.id;
        const data = req.body;
        // const data = req.body.images.length === 0 ? null : req.body.images

        if(req.body.options){
            data.options = btoa(data.options);
        }
        await PaymentInfo.findOneAndUpdate({_id: id}, req.body);
        res.status(200).json({
            message: 'Payment Info Updated Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getPaymentStatusFromPaymentGateway = async (req, res, next) => {

    console.log(req);
    console.log('----------------');
    console.log(req.merchant_txn_data);
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);

    // const merchant_txn_data = req.body.merchant_txn_data;
    // let order;

    // console.log(merchant_txn_data);

    // // await PaymentInfo.findOneAndUpdate({ }, { $push: { saved_merchant_txn_data: data } });

    // if (merchant_txn_data.txn_status === "1000" || merchant_txn_data.txn_status === 1000) {
    //     order = await Order.findOneAndUpdate({token: merchant_txn_data.token}, {$set:{txn_status: merchant_txn_data.txn_status}}, {returnOriginal: false});
    // } else {
    //     await Order.deleteOne({token: merchant_txn_data.token});
    // }

    try {

        res.status(200).json({
            // order: order
            message: 'success'
        });

    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }

}




exports.setCallbackToken = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const data = req.body.txnData;
    console.log('Here', req);
    const user = req.userData.userId;

    const updated = await User.findOneAndUpdate({ _id: user, "saved_merchant_txn_data.merchant_order_id" : data.merchant_order_id }, { $set: { "saved_merchant_txn_data.$": data } });

    if (!updated) {
        await User.findOneAndUpdate({ _id: user }, { $push: { saved_merchant_txn_data: data } });
    }

    try {
        res.status(200).json({
            message: 'Callback Info Added Successfully!'
        });
    } catch (err) {
        // console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getCallbackToken = async (req, res, next) => {

    const user = req.userData.userId;
    const txnToken = await User.findOne({_id: user}).select('tnxToken');

    console.log(txnToken);

    try {
        res.status(200).json({
            data: txnToken
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.setCallbackInfo = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const data = req.body.txnData;
    console.log('Here', req);
    const user = req.userData.userId;

    User.findOneAndUpdate({ _id: user }, { $set: { tnxData: data } });

    try {
        res.status(200).json({
            message: 'Callback Info Added Successfully!'
        });
    } catch (err) {
        // console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getCallbackInfo = async (req, res, next) => {

    const user = req.userData.userId;
    const txnData = await User.findOne({_id: user}).select('tnxData');

    console.log(paymentInfo);

    try {
        res.status(200).json({
            data: txnData
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getInfoFromSocket = async (req, res, next) => {

    console.log(req);
    console.log('----------------');
    console.log(req.body);
    console.log(req.query);
    console.log(req.param);
    const merchant_txn_data = req.body.merchant_txn_data;
    let order;

    console.log(merchant_txn_data);

    // await PaymentInfo.findOneAndUpdate({ }, { $push: { saved_merchant_txn_data: data } });

    // if (merchant_txn_data.txn_status === 1000) {
    //     order = await Order.findOneAndUpdate({token: merchant_txn_data.token}, {$set:{txn_status: merchant_txn_data.txn_status}}, {returnOriginal: false});
    // } else {
    //     await Order.deleteOne({token: merchant_txn_data.token});
    // }

    try {

        res.status(200).json({
            // order: order
            message: 'success'
        });

    } catch (err) {
        console.log('----------------');
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }

}

exports.sendInfoToSocket = async (req, res, next) => {

    data = await PaymentInfo.findOne({ });

    try {

        res.status(200).json({
            data: data.saved_merchant_txn_data
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }

}

