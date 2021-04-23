const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    hotel_id : {
        type: Number,
        required: [true], 
        unique: [true],
    },
    hotel_name: {
        type: String,
        required: [true],
        unique: [true],
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Duplicate Email Not allowed"],
        trim: true,
        uppercase: true,
        validate: function(value) {
          var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(value);
        }
    },
    street: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    city: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    postal_code: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
  });
  
  const Hotel = mongoose.model("Hotel", HotelSchema);
  module.exports = Hotel;