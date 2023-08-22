const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.APP_ORIGIN
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api", routes)

module.exports = app;