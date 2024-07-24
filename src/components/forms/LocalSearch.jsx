// LocalSearch.jsx

import React from "react";

const LocalSearch = ({
  keyword,
  setKeyword,
  categoryFilter,
  setCategoryFilter,
  subCategoryFilter,
  setSubCategoryFilter,
  categories,
  subCategories,
}) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setCategoryFilter(e.target.value);
    setSubCategoryFilter(""); // Reset subcategory filter when category changes
  };

  const handleSubCategoryChange = (e) => {
    e.preventDefault();
    setSubCategoryFilter(e.target.value);
  };

  return (
    <div className="container pt-1 pb-1 d-flex flex-wrap align-items-center">
      <input
        type="search"
        className="form-control mb-2 mr-2"
        placeholder="Search by name..."
        value={keyword}
        onChange={handleSearchChange}
        style={{ width: "200px" }}
      />
      <select
        className="form-control mb-2 mr-2"
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
      <select
        className="form-control mb-2"
        onChange={handleSubCategoryChange}
        value={subCategoryFilter}
        style={{ width: "200px" }}
      >
        <option value="">All Subcategories</option>
        {subCategories.map((subCat) => (
          <option key={subCat._id} value={subCat._id}>
            {subCat.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocalSearch;
