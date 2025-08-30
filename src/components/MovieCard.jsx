// This component shows ONE movie card
// It displays poster, title, description, and rating stars
export default function MovieCard({ movie }) {
  const { title, description, posterURL, rating } = movie;

  // Convert numeric rating (e.g. 4.5) into stars
  const fullStars = Math.round(Math.min(Math.max(rating, 0), 5));
  const stars = "★".repeat(fullStars) + "☆".repeat(5 - fullStars);

  return (
    <article className="card">
      <div className="poster-wrap">
        <img className="poster" src={posterURL} alt={`${title} poster`} />
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{description}</p>
        <div className="card-rating">
          <span className="stars">{stars}</span>
          <span className="rating-number">{rating}/5</span>
        </div>
      </div>
    </article>
  );
}
