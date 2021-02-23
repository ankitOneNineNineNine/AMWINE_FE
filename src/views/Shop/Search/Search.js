import React from "react";
import "./Search.css";

export default function Search() {
  return (
    <div className="search">
      <input type="search" placeholder="Search your items here"></input>
      <div className="searchButton">
        <i className="fa fa-search fa-2x"></i>
      </div>
    </div>
  );
}
