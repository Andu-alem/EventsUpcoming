const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
        required: false
    },
    postDate:{
        type: Date,
        default: Date.now
    },
    startingDate: {
        type: Date,
        default:new Date("2027-1-10"),
        required: true
    }
});

module.exports = mongoose.model('Events', EventSchema);