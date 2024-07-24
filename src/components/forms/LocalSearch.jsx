// LocalSearch.jsx

import React from "react";

const LocalSearch = ({
  keyword,
  setKeyword,
  categoryFilter,
  setCategoryFilter,
  categories,
}) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setCategoryFilter(e.target.value);
  };

  return (
    <div className="container pt-1 pb-1">
      <input
        type="search"
        className="form-control mb-2"
        placeholder="Search by name..."
        value={keyword}
        onChange={handleSearchChange}
        style={{ width: "200px", marginRight: "10px" }}
      />
      <select
        className="form-control mb-2"
        onChange={handleCategoryChange}
        value={categoryFilter}
        style={{ width: "200px" }}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocalSearch;
