import { useMemo, useState } from "react";
import MovieList from "./components/MovieList.jsx";
import Filter from "./components/Filter.jsx";
import AddMovieForm from "./components/AddMovieForm.jsx";

// These are some starter movies I added so that the app isn’t empty when it first loads.
const initialMovies = [
  {
    id: 1,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole to save humanity.",
    posterURL: "https://images.plex.tv/photo?size=medium-360&scale=1&url=https%3A%2F%2Fmetadata-static.plex.tv%2F3%2Fgracenote%2F38a8566babfadd1b349dbaecb45d0904.jpg",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Breaking Bad",
    description: "A chemistry teacher turned drug lord partners with a student.",
    posterURL: "https://m.media-amazon.com/images/I/81vpsIs58WL._AC_UF1000,1000_QL80_.jpg",
    rating: 5,
  },
];

export default function App() {
  // My list of movies (state)
  const [movies, setMovies] = useState(initialMovies);

  // Filters: what the user types (title) + minimum rating
  const [titleQuery, setTitleQuery] = useState("");
  const [minRating, setMinRating] = useState(0);

  // This will calculate the filtered list whenever movies/filters change
  const filteredMovies = useMemo(() => {
    const q = titleQuery.trim().toLowerCase();
    return movies.filter(
      (m) =>
        m.title.toLowerCase().includes(q) &&
        Number(m.rating) >= Number(minRating)
    );
  }, [movies, titleQuery, minRating]);

  // Function to add a new movie (passed into the AddMovieForm component)
  function handleAddMovie(newMovie) {
    setMovies((prev) => [
      ...prev,
      {
        ...newMovie,
        id: Date.now(), // give each movie a unique ID
        rating: Number(newMovie.rating) || 0,
      },
    ]);
  }

  return (
    <div className="container">
      <header className="header">
        <h1>🎬 My Movie App</h1>
        <p className="tagline">Add, browse, and filter your favourite movies & shows.</p>
      </header>

      {/* Controls section: filter + add movie form */}
      <section className="controls">
        <Filter
          titleQuery={titleQuery}
          setTitleQuery={setTitleQuery}
          minRating={minRating}
          setMinRating={setMinRating}
        />
        <AddMovieForm onAdd={handleAddMovie} />
      </section>

      {/* Movie list */}
      <main>
        <MovieList movies={filteredMovies} />
        {filteredMovies.length === 0 && (
          <p className="empty">
            No movies match your filters yet. Try adjusting the title or rating.
          </p>
        )}
      </main>

      <footer className="footer">Built with ❤️</footer>
    </div>
  );
}
