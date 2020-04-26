const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/covid19-demo', { 
    useFindAndModify: false, 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const port = 3000;
const mainRoute = require("./routes/main.route");

app.set('views', './views');
app.set("view engine", "pug");
app.use(express.static('public'));


app.use("/", mainRoute);

app.listen(port,() => {
    console.log("Server listen on port "+ port)
})