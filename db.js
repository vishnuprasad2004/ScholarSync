const mongoose = require("mongoose");


async function connectDb() {
    const connection = await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('connected with database');
    });
}

module.exports = connectDb;