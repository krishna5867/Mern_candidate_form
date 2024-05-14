const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  residentalStreet1: {
    type: String,
    required: true
  },
  residentalStreet2: {
    type: String,
    required: true
  },
  permanentStreet1: {
    type: String,
    default: null
  },
  permanentStreet2: {
    type: String,
    default: null
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
      documentFile: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
