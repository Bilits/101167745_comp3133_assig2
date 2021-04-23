const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    hotel_id : {
        type: Number,
        required: [true], 
    },
    user_id : {
        type: Number,
        required: [true], 
    },
    booking_date: {
        type: String,
        required: true,
    },
    booking_start: {
        type: String,
        required: true,
    },
    booking_end: {
        type: String,
        required: true,
    },
  });
  
  const Booking = mongoose.model("Booking", BookingSchema);
  module.exports = Booking;