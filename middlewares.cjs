const express = require('express');

module.exports = function(app) {
    app.use(express.static('public')); // Assuming all static assets are under 'public'
    app.use(express.static('functions'));
    app.use(express.static('pages'));
    app.use(express.static('css'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // CORS Configuration
    app.options("*", (req, res, next) => {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Authorization, Content-Length, X-Requested-With');
        res.send(200);
    });
};
