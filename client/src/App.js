import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');

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

  const handleBooking = () => {
    alert('🎉 Successfully Booked!');
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete all movies?')) {
      try {
        await axios.delete('http://localhost:5000/api/movies');
        alert('All movies deleted ✅');
        fetchMovies();
      } catch (error) {
        console.error('Error deleting movies:', error);
        alert('Failed to delete movies ❌');
      }
    }
  };

  return (
    <div className="app dark">
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
          placeholder="Banner Image URL"
          value={bannerUrl}
          onChange={e => setBannerUrl(e.target.value)}
          required
        />
        <button type="submit">Add Movie</button>
      </form>

      <button
        style={{
          backgroundColor: '#ff1744',
          border: 'none',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: 'pointer',
          margin: '20px auto',
          display: 'block'
        }}
        onClick={handleDeleteAll}
      >
        🗑️ Delete All Movies
      </button>

      <div className="movies-list">
        {movies.map(movie => (
          <div key={movie._id} className="movie-card">
            <img src={movie.bannerUrl} alt={movie.title} className="movie-banner" />
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <button onClick={handleBooking}>Book</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
