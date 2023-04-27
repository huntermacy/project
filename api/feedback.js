const express = require("express");
const router = express.Router();
const dbConnect = require("../models/db-connection");

router.post("/", (req, res) => {
    try {
        const feedback = req.body.feedback;
        const feedbackData = {
            feedback: feedback,
            date: new Date()
        };
        dbConnect.submitFeedback(feedbackData);
        res.status(200).json({ message: "Feedback successfully submitted" });
    } catch (error) {
        console.error(`Error submitting feedback: ${error.message}`);
        res.status(500).json({
            error: {
                message: "An error occurred while submitting feedback",
            },
        });
    }
});

module.exports = router;
