const express = require("express");
const router = express.Router();
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
        console.log(response.data.choices[0].text)
        res.json({ "message": response.data.choices[0].text });
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
