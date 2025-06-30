import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [tickets, setTickets] = useState(1);
  const [seatNumber, setSeatNumber] = useState('');

  const fetchMovies = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/movies');
      setMovies(res.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/movies', {
        title,
        description,
        bannerUrl,
      });
      setTitle('');
      setDescription('');
      setBannerUrl('');
      fetchMovies();
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleBooking = (movieId) => {
    alert(`🎉 Successfully booked ${tickets} ticket(s) for seat(s): ${seatNumber} 🎬`);
  };

  return (
    <div className="app dark">
      <header className="app-header-box">
        <div className="logo-box">
          <img src="/images/movielogo.png" alt="Movie Logo" className="logo" />
        </div>
      </header>

      <div className="landing">
        <div className="overlay">
          <h1 className="brand">MyMovieSlot</h1>
          <p className="tagline">Book Your Slot! Catch the Magic 🎬</p>
        </div>
      </div>

      <form className="movie-form" onSubmit={handleAddMovie}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Banner Image URL (optional)"
          value={bannerUrl}
          onChange={e => setBannerUrl(e.target.value)}
        />
        <button type="submit">Add Movie</button>
      </form>

      <div className="movies-list">
        {movies.map((movie, index) => (
          <div key={movie._id} className="movie-card">
            <img
              src={
                movie.bannerUrl ||
                (index === 0 ? '/images/movie1.jpg' :
                 index === 1 ? '/images/movie2.jpg' : '/images/default.jpg')
              }
              alt={movie.title}
              className="movie-banner"
            />
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>

            <div className="booking-section">
              <input
                type="number"
                min="1"
                max="10"
                value={tickets}
                onChange={e => setTickets(e.target.value)}
                placeholder="Tickets"
                className="booking-input"
              />
              <input
                type="text"
                value={seatNumber}
                onChange={e => setSeatNumber(e.target.value)}
                placeholder="Seat Number(s)"
                className="booking-input"
              />
              <button onClick={() => handleBooking(movie._id)}>Book</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
