import React, { useContext } from "react";
import "./Search.css";
import {SearchContext} from '../../../components/Shop/Shop';


export default function Search() {
  const searchCtx = useContext(SearchContext);
  return (
    <div className="search">
      <input type="search" placeholder="Enter name" onChange = {searchCtx.searchChange}></input>
      <div className="searchButton" onClick = {searchCtx.search}>
        <i className="fa fa-search fa-2x"></i>
      </div>
    </div>
  );
}
