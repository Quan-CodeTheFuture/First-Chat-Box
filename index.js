require('dotenv').config()
const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_SECRET, { 
    useFindAndModify: false, 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const mainRoute = require("./routes/main.route");
const chatBoxRoute = require("./routes/chat.route")

app.set('views', './views');
app.set("view engine", "pug");
app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use("/covid", mainRoute);
app.use("/chat",chatBoxRoute);

app.listen(port,() => {
    console.log("Server listen on port "+ port)
})