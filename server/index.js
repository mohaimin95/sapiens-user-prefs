require("dotenv").config()
const app = require("./src/app");
const connectDB = require("./src/utils/connectDB");

connectDB();


app.listen(process.env.PORT, err => {
    if (err) {
        return console.log("Error in starting server", err);
    }
    console.log("Server started at PORT", process.env.PORT)
})