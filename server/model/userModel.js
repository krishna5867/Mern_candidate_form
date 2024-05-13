const mongoose = require("mongoose");

const userSehema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  residentalAddress: {
    type: {
      street1: {
        type: String,
        // unique: true,
        //   required: true,
        default: null,
      },
      street2: {
        type: String,
        // unique: true,
        //   required: true,
        default: null,
      },
    },
    required: true,
  },
  permanentAddress: {
    street1: {
      type: String,
      // unique: true,
      default: null,
    },
    street2: {
      type: String,
      // unique: true,
      default: null,
    },
  },
  documents: [
    {
      fileName: {
        type: String,
        required: true,
      },
      fileType: {
        type: String,
        enum: ["image", "pdf"],
        required: true,
      },
      file: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSehema);
