require('dotenv').config()
const express = require('express');
const app = express();
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT;

app.use(express.static('public'));
app.use(express.static('css'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const openAiGet = require("./api/openai")
app.use("/api/openai", openAiGet)

//Serve index.html page to the client
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
})
//Serve stats.html page to the client
app.get("/stats", (req, res) => {
    res.sendFile(__dirname + "/pages/stats.html");
})


//Server starts listening on PORT
app.listen(PORT, () => console.log(`Console listening at ${PORT}`))

app.options("*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Length, X-Requested-With');
    res.send(200);
});
