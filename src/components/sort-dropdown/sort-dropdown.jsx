import "./sort-dropdown.css";

// eslint-disable-next-line react/prop-types
function SortDropdown({ sortOrder, setSortOrder }) {
  return (
    <div className="sort-dropdown">
      <label htmlFor="sort">Sort by:</label>
      <select
        id="sort"
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