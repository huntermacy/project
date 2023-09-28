require('dotenv').config();
const express = require('express');
const { PORT } = require('./config');
const middlewares = require('./middlewares');
const routes = require('./routes');

const app = express();

// Apply middlewares
middlewares(app);

// Apply routes
routes(app);

// Start the server
app.listen(PORT, () => console.log(`Console listening at ${PORT}`));
