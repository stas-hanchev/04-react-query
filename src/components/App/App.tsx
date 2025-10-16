import styles from './App.module.css'

import type { Movie } from '../../types/movie';

import { useState } from 'react'
import { Toaster, toast } from "react-hot-toast";
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import fetchMovies from '../../services/movieService';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (title: string) => {
    setLoading(true);
    setError(false);
    setMovies([]);
    try {
      const data = await fetchMovies(title);
      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(data.results);
    } catch {
      setError(true);
      toast.error("Error fetching movies.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.app}>
      <Toaster />
      <SearchBar onSubmit={handleSearch}></SearchBar>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <MovieGrid movies={movies} onSelect={setSelectedMovie}></MovieGrid>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  )
}

export default App
