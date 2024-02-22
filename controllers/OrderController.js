const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res) => {

    let data = req.body;
    console.log(data)
    const Order = await Order.create(data); 
    res.status(StatusCodes.CREATED).json({product});
};

const edit = async (req, res) => {

    let data = req.body;
    console.log(data);
    let _id = data._id;
    delete data._id

    await Order.findByIdAndUpdate(_id, data);
    let newThing = await Order.findById(_id);
    console.log(newThing);
    return res.status(StatusCodes.OK).json({message: 'update success', data: newThing});
};

const destroy = async (req,res)=>{
    let id = req.params.id;
    deleted = await Order.findByIdAndDelete(id);

    if(deleted){
        return res.status(StatusCodes.OK).json({message: 'delete success', data: newThing});
    }
    return res.status(StatusCodes.NOT_FOUND).json({message:'delete failed'})
};

const getaAll = async(req,res)=>{
    const orders = await Order.find().sort('name');
    // console.log(members)
    return res.json(orders);
}


module.exports = {
    getaAll,
    create,
    edit,
    destroy,
  };