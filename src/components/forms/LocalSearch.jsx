import React from "react";
const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <div className="conatiner pt-1 pb-1">
      <input
        type="search"
        className="form-control mb-4"
        placeholder="Search "
        value={keyword}
        onChange={handleSearchChange}
        style={{ width: "200px" }}
      />
    </div>
  );
};
export default LocalSearch;
