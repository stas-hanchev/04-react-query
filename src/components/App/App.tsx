import styles from './App.module.css'

import type { Movie } from '../../types/movie';

import { useEffect, useState } from 'react'
import { Toaster, toast } from "react-hot-toast";
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import fetchMovies from '../../services/movieService';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import paginationStyles from '../Pagination/Pagination.module.css'


function App() {
  const [title, setTitle] = useState<string>('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', title, page],
    queryFn: () => fetchMovies(title, page),
    enabled: title.trim().length > 0,
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.total_pages ?? 0;

  const handleSearch = async (newTitle: string) => {
    setTitle(newTitle);
    setPage(1);
  }

  useEffect(() => {
    if (isSuccess === true && data.results.length ===0) {
      toast.error("No movies found for your request.");
    }
  }, [data?.results.length, isSuccess]);

  return (
    <div className={styles.app}>
      <Toaster />
      <SearchBar onSubmit={handleSearch}></SearchBar>
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={paginationStyles.pagination}
          activeClassName={paginationStyles.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
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
