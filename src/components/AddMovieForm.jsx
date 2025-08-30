import { useState } from "react";

// This component contains a form that lets me add a new movie
// It collects title, description, poster URL, and rating
export default function AddMovieForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posterURL, setPosterURL] = useState("");
  const [rating, setRating] = useState(0);
  const [trailer, setTrailer] = useState(""); // NEW
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // validation
    if (!title.trim() || !description.trim() || !posterURL.trim()) {
      setError("Please fill in title, description and poster URL.");
      return;
    }

    const r = Number(rating);
    if (Number.isNaN(r) || r < 0 || r > 5) {
      setError("Rating must be a number between 0 and 5.");
      return;
    }

    // Pass new movie to App.jsx
    onAdd({
      title: title.trim(),
      description: description.trim(),
      posterURL: posterURL.trim(),
      rating: r,
      trailer: trailer.trim(), // NEW
    });

    // Reset form fields
    setTitle("");
    setDescription("");
    setPosterURL("");
    setRating(0);
    setTrailer(""); // NEW
    setError("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add a new movie/show</h2>

      <div className="row">
        <div className="field">
          <label htmlFor="new-title">Title</label>
          <input
            id="new-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Inception"
          />
        </div>

        <div className="field">
          <label htmlFor="new-rating">Rating (0–5)</label>
          <input
            id="new-rating"
            type="number"
            min="0"
            max="5"
            step="0.5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="new-poster">Poster URL</label>
        <input
          id="new-poster"
          type="url"
          value={posterURL}
          onChange={(e) => setPosterURL(e.target.value)}
          placeholder="https://..."
        />
      </div>

      {/* NEW: trailer embed link */}
      <div className="field">
        <label htmlFor="new-trailer">Trailer Embed URL (YouTube)</label>
        <input
          id="new-trailer"
          type="url"
          value={trailer}
          onChange={(e) => setTrailer(e.target.value)}
          placeholder="https://www.youtube.com/embed/xxxxxxx"
        />
      </div>

      <div className="field">
        <label htmlFor="new-desc">Description</label>
        <textarea
          id="new-desc"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is it about?"
        />
      </div>

      {error && <p className="error">{error}</p>}

      <button type="submit" className="btn">Add Movie</button>
    </form>
  );
}
