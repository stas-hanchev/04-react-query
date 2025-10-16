import styles from './App.module.css'

import type { Movie } from '../../types/movie';

import { useState } from 'react'
import { Toaster, /*toast*/ } from "react-hot-toast";
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import fetchMovies from '../../services/movieService';
import { useQuery } from '@tanstack/react-query';

function App() {
  const [title, setTitle] = useState<string>('');
  // const [movies, setMovies] = useState<Movie[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // const handleSearch = async (title: string) => {
  //   // setLoading(true);
  //   // setError(false);
  //   setMovies([]);
  //   try {
  //     const data = await fetchMovies(title);
  //     if (data.results.length === 0) {
  //       toast.error("No movies found for your request.");
  //     }
  //     setMovies(data.results);
  //   } catch {
  //     // setError(true);
  //     toast.error("Error fetching movies.");
  //   } finally {
  //     // setLoading(false);
  //   }
  // }

  const { data, /*error,*/ isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', title],
    queryFn: () => fetchMovies(title),
    enabled: title.trim().length > 0
  });


  return (
    <div className={styles.app}>
      <Toaster />
      <SearchBar onSubmit={setTitle}></SearchBar>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && <MovieGrid movies={data.results} onSelect={setSelectedMovie}></MovieGrid>}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  )
}

export default App
