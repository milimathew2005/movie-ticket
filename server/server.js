const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Movie model
const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  bannerUrl: String
});
const Movie = mongoose.model('Movie', movieSchema);

// Booking model
const bookingSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  userName: { type: String, required: true },
  seats: { type: Number, required: true, min: 1 }
}, { timestamps: true });
const Booking = mongoose.model('Booking', bookingSchema);

// Routes
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/movies', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/movies', async (req, res) => {
  try {
    await Movie.deleteMany({});
    res.status(200).json({ message: 'All movies deleted ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const { movieId, userName, seats } = req.body;
    const booking = new Booking({ movieId, userName, seats });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('movieId', 'title');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
