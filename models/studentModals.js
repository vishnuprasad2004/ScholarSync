const mongoose = require("mongoose")

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollno: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    }
}, {
   timestamps: true 
});

module.exports = mongoose.model('Student', StudentSchema);
