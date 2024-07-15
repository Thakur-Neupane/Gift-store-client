import React from "react";
const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <div className="conatiner pt-4 pb-4">
      <input
        type="search"
        className="form-control mb-4"
        placeholder="Search For Category"
        value={keyword}
        onChange={handleSearchChange}
        style={{ width: "200px" }}
      />
    </div>
  );
};
export default LocalSearch;
