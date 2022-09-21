const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://bhuvnesh:kRjJh36LxQqLQipt@cluster0.4u1jf9g.mongodb.net/scoreDB", {useNewUrlParser: true}, {useUnifiedTopology: true})

const scoreSchema = {
    email: String,
    score: Number
}

const Score = mongoose.model("Score", scoreSchema);

app.get("/", function(req, res) {
    res.send("express is working")
})

app.listen(3001, function() {
    console.log("server is running on 3000");
})