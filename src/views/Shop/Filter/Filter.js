import React from "react";
import Search from "../Search/Search";
import "./Filter.css";

export default function Filter({filter, filterChange, searchChange, search}) {
  return (
    <div className="filter">
      <h2>Search</h2>
      <Search filter = {filter}/>
      <h2>Filter</h2>
      <div className="priceRange">
        <label>Price</label>
        <input type="number" name = 'min' onChange = {filterChange}></input>
        <label>to</label>
        <input type="number" name = 'max'  onChange = {filterChange}></input>
      </div>
      <div className="wOrB">
        <h2>Type</h2>
        <input type="checkbox" name="type" value="wine"  onChange = {filterChange}/>
        <label htmlFor="wine">Wine</label>
        <input type="checkbox" name="type" value="beer"  onChange = {filterChange}/>
        <label htmlFor="beer">Beer</label>
        <br />
      </div>
      <div className="variety">
        <h2>Variety</h2>
        <input type="checkbox" name="Chardonnay" value='Chardonnay'  onChange = {filterChange}/>
        <label htmlFor="chardonay">Chardonay</label>
        <br />
        <input type="checkbox" name="sparkle" value="Sparkle"  onChange = {filterChange}/>
        <label htmlFor="red">Sparkle</label>
        <br />
   
      </div>
      <button className="filterButton" onClick = {filter}>Filter</button>
    </div>
  );
}
