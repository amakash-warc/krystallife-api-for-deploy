// Require Main Modules..
const {validationResult} = require('express-validator');
const Generic = require('../models/product-generic');


exports.addSingleGeneric = async (req, res, next) => {

    try {

        const data = req.body;
        const dataExists = await Generic.findOne({slug: data.slug}).lean();

        if (dataExists) {
            const error = new Error('A product generic with this name/slug already exists');
            error.statusCode = 406;
            next(error)
        } else {
            const generic = new Generic(data);
            const tagRes = await generic.save();
            res.status(200).json({
                response: tagRes,
                message: 'Generic Added Successfully!'
            });
        }

    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.insertManyGeneric = async (req, res, next) => {

    try {
        const data = req.body;
        // await Generic.deleteMany({});
        const result = await Generic.insertMany(data);

        res.status(200).json({
            success: true,
            message: `${result && result.length ? result.length : 0} Generics imported Successfully!`
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getAllGenerics = async (req, res, next) => {
    try {

        const pageSize = +req.query.pageSize;
        const currentPage = +req.query.page;
        let query = Generic.find();

        if (pageSize && currentPage) {
            query.skip(pageSize * (currentPage - 1)).limit(pageSize)
        }

        const results = await query;
        const count = await Generic.countDocuments();

        res.status(200).json({
            data: results,
            count: count,
            message: 'All Product fetch Successfully!'
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

exports.getGenericByGenericId = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const tagId = req.params.tagId;
    const productGeneric = await Generic.findOne({_id: tagId});

    try {
        res.status(200).json({
            data: productGeneric,
            message: 'Generic Added Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.editGenericData = async (req, res, next) => {

    const updatedData = req.body;

    try {
        await Generic.updateOne({_id: updatedData._id}, {$set: updatedData})
        res.status(200).json({
            message: 'Generic Updated Successfully!'
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

exports.deleteGenericByGenericId = async (req, res, next) => {

    const tagId = req.params.tagId;
    await Generic.deleteOne({_id: tagId});

    try {
        res.status(200).json({
            message: 'Generic Deleted Successfully',
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}


exports.getGenericsBySearch = async (req, res, next) => {
    try {

        const search = req.query.q;
        const pageSize = +req.query.pageSize;
        const currentPage = +req.query.currentPage;
        const newQuery = search.split(/[ ,]+/);
        const queryArray = newQuery.map((str) => ({name: RegExp(str, 'i')}));
        // const regex = new RegExp(query, 'i')

        let productGenerics = Generic.find({
            $or: [
                { $and: queryArray }
            ]
        });

        if (pageSize && currentPage) {
            productGenerics.skip(pageSize * (currentPage - 1)).limit(Number(pageSize))
        }

        const results = await productGenerics;
        const count = results.length;


        res.status(200).json({
            data: results,
            count: count
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
