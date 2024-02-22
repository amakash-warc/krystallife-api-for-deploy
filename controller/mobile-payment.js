// Require Main Modules..
const {validationResult} = require('express-validator');
const MobilePayment = require('../models/mobile-payment');

// const FooterData = require('../models/mobile-payment');

/**
 * MobilePayment 
 */

exports.addMobilePayment = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    try {
        const data = req.body;
        const footer = new MobilePayment(data);
        await footer.save();

        res.status(200).json({
            message: 'Mobile Payment Added Successfully!'
        });
    } catch (err) {
        console.log(err)
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getMobilePaymentDataById = async(req,res,next) =>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const blogId = req.params.id;
    console.log(blogId)
    const blog = await MobilePayment.findOne({_id: blogId});

    try {
        console.log(blog)
        res.status(200).json({
            data: blog,
        });
    } catch (err) {
       
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getMobilePaymentData = async (req, res, next) => {


    try {
        const data = await MobilePayment.find();

        res.status(200).json({
            data: data,
            message: 'MobilePayment Get!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.updateMobilePaymentData = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    try {
        console.log(req.body)
        const id = req.body._id;

        await MobilePayment.findOneAndUpdate({_id: id}, req.body);

        res.status(200).json({
            message: 'Footer Data Updated Successfully!'
        });

    } catch (err) {
        console.log(err)
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

