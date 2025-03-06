import "./sort-dropdown.css";

// eslint-disable-next-line react/prop-types
function SortDropdown({ sortBy, setSortBy, sortOrder, setSortOrder }) {
  return (
    <div className="sort-dropdown">
      <label htmlFor="sortBy">Sort by:</label>
      <select
        id="sortBy"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="created_at">Date</option>
        <option value={"comment_count"}>Comments</option>
        <option value="votes">Votes</option>
      </select>
      <label htmlFor="sortOrder">Order:</label>
      <select
        id="sortOrder"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="DESC">Newest First ↓</option>
        <option value="ASC">Oldest First ↑</option>
      </select>
    </div>
  );
}

export default SortDropdown;