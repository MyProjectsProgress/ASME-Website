const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'You must enter your name'],
            minlength: [9, 'You must enter your full name'],
            maxlength: [40, 'You must type shorter than 40 characters'],
            lowercase: true,
            trim: true,
        },

        slug: {
            type: String,
            lowercase: true,
        },

        phoneNumber: {
            type: String,
            required: [true, 'You must enter your phone number'],
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
        },

        role: {
            type: String,
            trim: true,
            default: 'member',
        },

        image: {
            type: String,
            required: [true, 'You must upload an image'],
        },

    },
    { timestamps: true }
);

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;