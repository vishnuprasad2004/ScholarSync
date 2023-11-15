const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    branches: {
        type: Array,
        required : true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);
