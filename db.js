const mongoose = require("mongoose");
const colors = require("./utils/colors")

async function connectDb() {
    const connection = await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log(colors.blue("DATABASE: connected with database"));
    }).catch((e) => {
        console.log(colors.red("DATABASE: error in connecting the database"));
    });
}

module.exports = connectDb;