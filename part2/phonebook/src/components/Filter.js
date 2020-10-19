import React from "react";

const Filter = ({ search, setSearch }) => (
  <>
    filter shown with{" "}
    <input value={search} onChange={(e) => setSearch(e.target.value)} />
  </>
);

export default Filter;
