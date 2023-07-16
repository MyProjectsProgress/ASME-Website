const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'You must enter workshop title'],
            trim: true,
        },

        slug: {
            type: String,
            lowercase: true,
        },

        description: {
            type: String,
            required: [true, 'You must enter workshop description'],
        },

        image: {
            type: String,
            required: [true, 'You must upload an image'],
        },


    },
    { timestamps: true }
);

const Workshop = mongoose.model('Workshop', workshopSchema);

module.exports = Workshop;
