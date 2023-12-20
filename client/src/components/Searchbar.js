import React from "react";
import "./Searchbar.css";

function Searchbar({ handleSearch }) {
  return (
    <>
      <nav class="searchicon">
        <form className="container-fluid ">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter username to search"
              aria-label="Username"
              aria-describedby="basic-addon1"
              id="myInput"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </form>
      </nav>
    </>
  );
}

export default Searchbar;
