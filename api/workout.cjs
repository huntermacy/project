const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

router.get('/', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('excersize');
        const workouts = await db.collection('strength-training').find().sort({ date: -1 }).toArray();
        res.send(workouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await client.close();
    }
});

router.get('/type', async (req, res) => {
    try {
      await client.connect();
      const db = client.db('excersize');
  
      // Query the database for unique workout types
      const types = await db.collection('strength-training').distinct('type');
  
      // Close the database connection
      await client.close();
  
      // Send the unique workout types as a response
      res.send(types);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });
  

module.exports = router;
