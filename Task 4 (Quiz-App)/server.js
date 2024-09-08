const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define a Schema and Model for the high scores
const highScoreSchema = new mongoose.Schema({
    name: String,
    score: Number,
});

const HighScore = mongoose.model('HighScore', highScoreSchema);

// POST route to save a new high score
app.post('/api/highscores', async (req, res) => {
    try {
        const newHighScore = new HighScore(req.body);
        await newHighScore.save();
        res.status(201).send(newHighScore);
    } catch (err) {
        res.status(400).send(err);
    }
});

// GET route to retrieve all high scores
app.get('/api/highscores', async (req, res) => {
    try {
        const highScores = await HighScore.find().sort({ score: -1 }).limit(5);
        res.status(200).send(highScores);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
