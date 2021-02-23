import React from "react";
import Search from "../Search/Search";
import "./Filter.css";

export default function Filter() {
  return (
    <div className="filter">
      <h2>Filter</h2>
      <Search />
      <div className="priceRange">
        <label>Price</label>
        <input type="number"></input>
        <label>to</label>
        <input type="number"></input>
      </div>
      <div className="wOrB">
        <h2>Type</h2>
        <input type="checkbox" name="wine" value="wine" />
        <label htmlFor="wine">Wine</label>
        <input type="checkbox" name="beer" value="beer" />
        <label htmlFor="beer">Beer</label>
        <br />
      </div>
      <div className="variety">
        <h2>Variety</h2>
        <input type="checkbox" name="sparkling" value="sparkling" />
        <label htmlFor="sparkling">Sparkling</label>
        <br />
        <input type="checkbox" name="red" value="red" />
        <label htmlFor="red">Red</label>
        <br />
        <input type="checkbox" name="sweet" value="sweet" />
        <label htmlFor="sweet">Sweet</label>
        <br />
        <input type="checkbox" name="rose" value="rose" />
        <label htmlFor="rose">Rose</label>
        <br />
      </div>
      <button className="filterButton">Filter</button>
    </div>
  );
}
