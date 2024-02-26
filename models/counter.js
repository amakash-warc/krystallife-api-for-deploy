const mongoose = require("mongoose");
const counterSchema = new mongoose.Schema(
  {
    orderCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Counter", counterSchema);
