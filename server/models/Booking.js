const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  userName: { type: String, required: true },
  seats: { type: Number, required: true, min: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
