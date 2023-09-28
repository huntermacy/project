require('dotenv').config();
const express = require('express');
const { PORT } = require('./config.cjs');
const middlewares = require('./middlewares.cjs');
const routes = require('./routes.cjs');

const app = express();

// Apply middlewares
middlewares(app);

// Apply routes
routes(app);

// Start the server
app.listen(PORT, () => console.log(`Console listening at ${PORT}`));