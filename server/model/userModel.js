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
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    residentalAddress: {
        street1: {
            type: String,
            unique: true,
            required: true
        },
        street2: {
            type: String,
            unique: true,
            required: true
        },
    },
    permanentAddress: {
        street1: {
            type: String,
            unique: true,
        },
        street2: {
            type: String,
            unique: true,
        },
    },
    documents: [
        {
            fileName: {
                type: String,
                required: true
            },
            fileType: {
                type: String,
                enum: ['image', 'pdf'],
                required: true
            },
            file: {
                type: String,
                requiredd: true
            }
        }
    ]
})

module.exports = mongoose.model("User", userSehema)
