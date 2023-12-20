const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    minlength: 10,
  },
  work: {
    type: String,
    required: true,
  },
  add: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  admin_id: {
    type: String,
    required: true,
  },
});

const MEMBERDETAIL = new mongoose.model("MEMBERDETAIL", userSchema);

module.exports = MEMBERDETAIL;
