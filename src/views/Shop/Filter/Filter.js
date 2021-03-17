import React from "react";
import Search from "../Search/Search";
import "./Filter.css";

export default function Filter({filter, varieties, filterChange, searchChange, search}) {
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
       <div className = 'varietyContainer'>
       {
          varieties.map((variety, i) =>{
            return (
              <div key = {i}>
                    <input type="checkbox" name={variety} value={variety}  onChange = {filterChange}/>
                     <label htmlFor={variety}>{variety}</label>
                     <br />
              </div>
            )
          })
        }
       </div>

   
      </div>
      <button className="filterButton" onClick = {filter}>Filter</button>
    </div>
  );
}
