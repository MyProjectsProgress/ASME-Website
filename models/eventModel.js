const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'You must enter event title'],
            trim: true,
        },

        slug: {
            type: String,
            lowercase: true,
        },

        date: Date,

        description: {
            type: String,
            required: [true, 'You must enter event description'],
        },

        backgroundImage: {
            type: String,
            required: [true, 'You must upload a backgorund image'],
        },

        foregroundImage: {
            type: String,
            required: [true, 'You must upload a backgorund image'],
        },

        expired: {
            type: Boolean,
            default: false,
        },

    },
    { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
