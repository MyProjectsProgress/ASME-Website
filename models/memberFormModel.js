const mongoose = require('mongoose');

const formSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'You must enter your name'],
            minlength: [9, 'You must enter your full name'],
            maxlength: [40, 'You must type shorter than 40 characters'],
            lowercase: true,
            trim: true,
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

        university: {
            type: String,
            required: [true, 'You must enter your university name'],
            trim: true,
            minlength: [2, 'minimum characters are 2'],
            maxlength: [40, 'maximum characters are 40']
        },

        faculty: {
            type: String,
            required: [true, 'You must enter your faculty name'],
            trim: true,
            minlength: [2, 'minimum characters are 2'],
            maxlength: [40, 'maximum characters are 40']
        },

        department: {
            type: String,
            required: [true, 'You must enter your department name'],
            trim: true,
            minlength: [2, 'minimum characters are 2'],
            maxlength: [40, 'maximum characters are 40']
        },

        Major: {
            type: String,
            trim: true,
            minlength: [2, 'minimum characters are 2'],
            maxlength: [40, 'maximum characters are 40']
        },

        graduationYear: {
            type: Number,
            required: [true, 'Graduation year is required'],
        },

        position: {
            type: String
        },

        comment: {
            type: String
        },

        previousExperience: {
            type: String
        }
    },
    { timestamps: true }
);

const MemberForm = mongoose.model('MemberForm', formSchema);

module.exports = MemberForm;