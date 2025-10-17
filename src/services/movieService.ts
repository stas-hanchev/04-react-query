import axios from "axios";

import type { Movie } from "../types/movie";

interface FetchMoviesResponse {
  results: Movie[];
  page: number;
  total_results: number;
  total_pages: number;
}

export default async function fetchMovies(title: string, page: number): Promise<FetchMoviesResponse> {
    const API_URL = 'https://api.themoviedb.org/3/';
    const token = import.meta.env.VITE_TMDB_TOKEN;
    const response = await axios.get<FetchMoviesResponse>(`${API_URL}/search/movie`, {
        params: {
            query: title,
            page
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(response.data);

    return response.data;
}