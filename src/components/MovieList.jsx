import MovieCard from "./MovieCard.jsx";

// This component simply loops over movies and renders MovieCard for each one
export default function MovieList({ movies }) {
  return (
    <section className="grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}
