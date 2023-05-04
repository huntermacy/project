const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Connect to database
async function connect() {
    try {
        await client.connect();
        console.log("Successfully connected to DB");
        const currentDate = new Date();
    } catch (err) {
        console.error(err);
    }
}
connect();

// Insert weight-lifting workout into database
async function insertWorkout(workoutJSON) {
    try {
        const currentDate = new Date();
        workoutJSON.date = currentDate;
        await client.connect();
        const db = client.db("excersize");
        const collection = db.collection("strength-training");
        await collection.insertOne(workoutJSON);
        console.log("Workout inserted into collection!");
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

// Insert feedback into database
async function submitFeedback(feedback) {
    try {
        const currentDate = new Date();
        feedback.date = currentDate;
        feedback.type = "feedback";
        await client.connect();
        const db = client.db("app");
        const collection = db.collection("feedback");
        await collection.insertOne(feedback);
        console.log("Feedback inserted into collection!");
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

module.exports = {
    client,
    connect,
    insertWorkout,
    submitFeedback,
};
