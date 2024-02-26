const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  product: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
  orderType: {
    type: String,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("OrderItem", schema);
