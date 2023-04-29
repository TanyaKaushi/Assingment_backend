const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  sku: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  qty: {
    type: String,
    required: true,
  },

  articleImage: {
    type: String,
    required: true,
  },
});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
