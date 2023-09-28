const workout = require('./api/workout.cjs');
const openAi = require("./api/openai.cjs");
const feedback = require("./api/feedback.cjs");

module.exports = function(app) {
    app.use('/workout', workout);
    app.use('/type', workout); // NOTE: This seems to be a duplicate. Ensure it's intentional.
    app.use("/api/openai", openAi);
    app.use("/api/feedback", feedback);

    // Serve pages to the client
    app.get("/", (req, res) => res.sendFile(__dirname + "/pages/home.html"));
    app.get("/stats", (req, res) => res.sendFile(__dirname + "/pages/stats.html"));
    app.get("/log", (req, res) => res.sendFile(__dirname + "/pages/log.html"));
    app.get("/feedback", (req, res) => res.sendFile(__dirname + "/pages/feedback.html"));
};
