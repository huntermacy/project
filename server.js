require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT;

app.use(express.static('public'));
app.use(express.static('css'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const openAiGet = require("./api/openai")
app.use("/api/openai", openAiGet)

//Serve html page to the client
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
})

//Server starts listening on PORT
app.listen(PORT, () => console.log(`Console listening at ${PORT}`))

app.use(cors());

app.options("*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Length, X-Requested-With');
    res.send(200);
});

// Connect to MongoDB
const { MongoClient } = require('mongodb');
const uri = MONGO_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Successfully connected to DB");

        // create a new schema for workouts
        const workoutSchema = {
            users: {
                workout: {
                    type: String,
                    stats: {
                        reps: {
                            type: Number
                        },
                        sets: {
                            type: Number
                        },
                        weight: {
                            type: Number
                        },
                        timestamp: {
                            type: Number
                        }
                    },
                }
            }
        };

        // create a new collection with the workout schema
        const db = client.db("test");
        const collection = db.collection("workouts");
        // await collection.insertOne(workoutSchema);
        console.log("Workout schema created!");
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
