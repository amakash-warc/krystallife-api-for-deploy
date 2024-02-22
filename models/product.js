const mongoose = require("mongoose");
const Productchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      minlength: 3,
      maxlength: 50,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    detailedDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", Productchema);
