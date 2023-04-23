const dotenv = require('dotenv')

const express = require("express");
const router = express.Router();

const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
    try {
        const workout = req.body.workout;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(workout),
            max_tokens: 100,
            temperature: 0,
        });
        function generatePrompt(workout) {
            return `Return JSON {"reps":, "sets":, "weight":, "type":} from ${workout} with type being the type of workout`;
        }
        try {
            const workoutJSON = JSON.parse(response.data.choices[0].text);
            async function run() {
                try {
                    await client.connect();
                    await client.db("admin").command({ ping: 1 });
                    console.log("Successfully connected to DB");
                    const db = client.db("test");
                    const collection = db.collection("workouts");
                    await collection.insertOne(workoutJSON);
                    console.log("Workout inserted into collection!");
                } catch (err) {
                    console.error(err);
                } finally {
                    await client.close();
                }
            }
            run().catch(console.dir);
            res.send(workoutJSON)
        } catch {
            console.log("Error Parsing JSON")
        };
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
