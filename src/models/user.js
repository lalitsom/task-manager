const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
  age: {
      type: Number,
      default: 26
  }
});

module.exports = User;
