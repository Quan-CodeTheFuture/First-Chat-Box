require('dotenv').config()
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

const fileupload = require("express-fileupload");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
mongoose.connect(process.env.MONGODB_SECRET, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(fileupload({
    useTempFiles: true
}));
cloudinary.config({
    cloud_name: "storagecloud",
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const mainRoute = require("./routes/main.route");
const chatBoxRoute = require("./routes/chat.route");
const authMiddleware = require("./middlewares/auth.middleware");
const authRoute = require("./routes/auth.route");
app.set('views', './views');
app.set("view engine", "pug");
app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use("/covid", mainRoute);
app.use("/chat", authMiddleware.requireAuth, chatBoxRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
    res.send(`
        <h1>Hello</h1>
        <a href='/covid/'>Covid</a>
        <a href='/chat/interface'>Chat Box</a>
    `)
})
app.listen(port, () => {
    console.log("Server listen on port " + port)
})