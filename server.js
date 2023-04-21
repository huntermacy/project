const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.listen(3300, () => console.log('Console listening at 3300'))
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

mongoose.connect('mongodb://127.0.0.1:27017/').then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log(`Error connecting to database: ${err}`);
});