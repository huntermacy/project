require('dotenv').config()
const express = require('express');
const app = express();

//Environment Variables
const PORT = process.env.PORT;

app.use(express.static('public'));
app.use(express.static('functions'));
app.use(express.static('pages'));
app.use(express.static('css'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const workout = require('./api/workout')
app.use('/workout', workout)

const openAi = require("./api/openai")
app.use("/api/openai", openAi)

const feedback = require("./api/feedback")
app.use("/api/feedback", feedback)

//Serve pages to the client
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
})
app.get("/stats", (req, res) => {
    res.sendFile(__dirname + "/pages/stats.html");
})
app.get("/log", (req, res) => {
    res.sendFile(__dirname + "/pages/log.html");
})
app.get("/feedback", (req, res) => {
    res.sendFile(__dirname + "/pages/feedback.html");
})


//Server starts listening on PORT
app.listen(PORT, () => console.log(`Console listening at ${PORT}`))

app.options("*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Length, X-Requested-With');
    res.send(200);
});
