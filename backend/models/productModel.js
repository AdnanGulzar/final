const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
 
  images: [
    {
        type: String,
        required: true,
      },
   
  ],

  country: {type: String, required: [true, "Please Enter  Country"]},
  provience: {type: String, required: [true, "Please Enter provience"]},
  city: {type: String, required: [true, "Please Enter city name"]},
  category: [{
    type: String,
    required: [true, "Please Enter Product Category"],
  }],

  condition: {  type: String,
    enum: ["New", "Used"]},

  username: {  type: String,
    required: true},
 number: {  type: String,
    required: true},
  wnumber: {  type: String,
    required: true},
  address: {  type: String },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  userid: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },  
  active: {type: Boolean, default: true},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
