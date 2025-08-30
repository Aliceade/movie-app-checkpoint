// This component holds the search and rating filter inputs
// The values are controlled by App.jsx via props
export default function Filter({ titleQuery, setTitleQuery, minRating, setMinRating }) {
  return (
    <div className="filter">
      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Search title..."
          value={titleQuery}
          onChange={(e) => setTitleQuery(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="rating">Min Rating</label>
        <input
          id="rating"
          type="number"
          min="0"
          max="5"
          step="0.5"
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
