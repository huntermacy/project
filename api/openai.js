const dotenv = require('dotenv')

const express = require("express")
const router = express.Router();
const dbConnect = require('../models/db-connection')

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// API sending user prompt to ChatGPT for data extraction
router.post("/", async (req, res) => {
    try {
        // request body from user entry
        const workout = req.body.workout;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(workout),
            max_tokens: 100,
            temperature: 0,
        });
        function generatePrompt(workout) {
            return `Return JSON {"reps":, "sets":, "weight":, "type":} from ${workout}
            Possible types include: squats, leg-press, deadlift, bench-press, incline-press, overhead-press, pull-ups, dips, push-ups, sit-ups
            `;
        }
        // parse data and put into JSON format
        workoutJSON = JSON.parse(response.data.choices[0].text);
        // Add users entry to JSON
        workoutJSON.userEntry = workout
        //use the ./models/dbconnection function to insert to database
        dbConnect.insertWorkout(workoutJSON)
    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        };
    };
});


module.exports = router;
