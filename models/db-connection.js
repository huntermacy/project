const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Connect to database
async function connect() {
    try {
        await client.connect();
        console.log("Successfully connected to DB");
    } catch (err) {
        console.error(err);
    }
}

// Insert weight-lifting workout into database
async function insertWorkout(workoutJSON) {
    try {
        const currentDate = new Date();
        workoutJSON.date = currentDate;
        await client.connect();
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

module.exports = {
    client,
    connect,
    insertWorkout,
};
