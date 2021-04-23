const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id : {
        type: Number,
        required: [true], 
        unique: [true],
    },
    username: {
        type: String,
        required: [true],
        unique: [true],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true],
      trim: true,
      uppercase: true,
      validate: function(value) {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      }
    },
  });
  
  const User = mongoose.model("User", UserSchema);
  module.exports = User;