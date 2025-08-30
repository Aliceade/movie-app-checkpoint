import { useParams, Link } from "react-router-dom";

// This page shows the full description and an embedded trailer.
// I’m receiving the full movies array as a prop from App and finding the one that matches the URL id.
export default function MovieDescription({ movies }) {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === Number(id));

  if (!movie) {
    // In case the id is invalid or the movie was deleted
    return (
      <div className="container">
        <p>Movie not found.</p>
        <Link to="/" className="btn">Back to Home</Link>
      </div>
    );
  }

  const fullStars = Math.round(Math.min(Math.max(movie.rating, 0), 5));
  const stars = "★".repeat(fullStars) + "☆".repeat(5 - fullStars);

  return (
    <div className="container">
      <header className="header">
        <h1>{movie.title}</h1>
        <p className="tagline">Details & Trailer</p>
      </header>

      <div className="grid" style={{ gridTemplateColumns: "1fr", gap: 24 }}>
        <article className="card">
          <div className="poster-wrap" style={{ maxHeight: 480 }}>
            <img className="poster" src={movie.posterURL} alt={`${movie.title} poster`} />
          </div>
          <div className="card-body">
            <h3 className="card-title">{movie.title}</h3>
            <p className="card-desc" style={{ height: "auto" }}>{movie.description}</p>
            <div className="card-rating">
              <span className="stars">{stars}</span>
              <span className="rating-number">{movie.rating}/5</span>
            </div>
          </div>
        </article>

        {/* I’m embedding the trailer using the YouTube embed URL saved on the movie */}
        <div className="card" style={{ padding: 16 }}>
          <div className="card-body">
            <h3 className="card-title">Trailer</h3>
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                title={`${movie.title} trailer`}
                src={movie.trailer}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      {/* I’m giving the user a way to return to the list */}
      <div style={{ marginTop: 16 }}>
        <Link to="/" className="btn">⬅ Back to Home</Link>
      </div>
    </div>
  );
}
