const mongoose = require('mongoose');

const expertSchema = mongoose.Schema({
    expertname: {
        type: String,
        required : true
    },
    expertise: {
        type: String,
        required : true
    },
    ticketsAssigned: {
        type: Number,
        default : 0
    },
});
module.exports = mongoose.model("experts", expertSchema);