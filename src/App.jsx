import { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList.jsx";
import Filter from "./components/Filter.jsx";
import AddMovieForm from "./components/AddMovieForm.jsx";
import MovieDescription from "./components/MovieDescription.jsx"; // new page

// I added trailer links to my movie objects (required by the checkpoint)
const initialMovies = [
  {
    id: 1,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole to save humanity.",
    posterURL:
      "https://images.plex.tv/photo?size=medium-360&scale=1&url=https%3A%2F%2Fmetadata-static.plex.tv%2F3%2Fgracenote%2F38a8566babfadd1b349dbaecb45d0904.jpg",
    rating: 4.5,
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0", // I added trailer link
  },
  {
    id: 2,
    title: "Breaking Bad",
    description: "A chemistry teacher turned drug lord partners with a student.",
    posterURL: "https://m.media-amazon.com/images/I/81vpsIs58WL._AC_UF1000,1000_QL80_.jpg",
    rating: 5,
    trailer: "https://www.youtube.com/embed/vKQi3bBA1y8",
  },
];

export default function App() {
  // My list of movies (state stays here so every page can use it)
  const [movies, setMovies] = useState(initialMovies);

  // Filters: what the user types (title) + minimum rating
  const [titleQuery, setTitleQuery] = useState("");
  const [minRating, setMinRating] = useState(0);

  // This will calculate the filtered list whenever movies/filters change
  const filteredMovies = useMemo(() => {
    const q = titleQuery.trim().toLowerCase();
    return movies.filter(
      (m) => m.title.toLowerCase().includes(q) && Number(m.rating) >= Number(minRating)
    );
  }, [movies, titleQuery, minRating]);

  // Function to add a new movie (from AddMovieForm)
  function handleAddMovie(newMovie) {
    // I’m making sure rating is a number and giving the movie a unique id
    setMovies((prev) => [
      ...prev,
      { ...newMovie, id: Date.now(), rating: Number(newMovie.rating) || 0 },
    ]);
  }

  return (
    // I’m defining two routes:
    // 1) "/" shows my original homepage UI
    // 2) "/movie/:id" shows the description + trailer page
    <Routes>
      <Route
        path="/"
        element={
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
                <p className="empty">No movies match your filters yet. Try adjusting the title or rating.</p>
              )}
            </main>

            <footer className="footer">Built with ❤️</footer>
          </div>
        }
      />

      {/* New route for the movie description + trailer page */}
      <Route path="/movie/:id" element={<MovieDescription movies={movies} />} />
    </Routes>
  );
}
