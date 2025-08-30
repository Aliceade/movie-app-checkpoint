// This component shows ONE movie card
// It displays poster, title, description, and rating stars
import { Link } from "react-router-dom";

// I’m making the whole card clickable so it navigates to the details page
export default function MovieCard({ movie }) {
  const { id, title, description, posterURL, rating } = movie;

  const fullStars = Math.round(Math.min(Math.max(rating, 0), 5));
  const stars = "★".repeat(fullStars) + "☆".repeat(5 - fullStars);

  return (
    <Link to={`/movie/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <article className="card" aria-label={`${title} rated ${rating} out of 5`}>
        <div className="poster-wrap">
          <img className="poster" src={posterURL} alt={`${title} poster`} />
        </div>
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <p className="card-desc">{description}</p>
          <div className="card-rating" title={`Rating: ${rating}/5`}>
            <span className="stars" aria-hidden>
              {stars}
            </span>
            <span className="rating-number">{rating}/5</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

