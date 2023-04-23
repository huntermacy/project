const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        console.log("Successfully connected to DB");
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    client,
    connect,
};
