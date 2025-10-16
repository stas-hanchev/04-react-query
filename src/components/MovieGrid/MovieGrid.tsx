import css from './MovieGrid.module.css';
import type { Movie } from "../../types/movie";

interface MovieGridProps {
    onSelect: (movie: Movie) => void;
    movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
    
    return (
        <ul className={css.grid}>
            {movies.map((item) => {
                const posterUrl = item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image";

                return <li key={item.id} onClick={() => onSelect(item)}>
                    <div className={css.card}>
                        <img
                            className={css.image}
                            src={posterUrl}
                            alt={item.title}
                            loading="lazy"
                        />
                        <h2 className={css.title}>{item.title}</h2>
                    </div>
                </li>
            })}
        </ul>
    );
}