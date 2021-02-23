import React, { useEffect, useState } from "react";
import Product from "../../views/ProductView/Product/Product";
import Filter from "../../views/Shop/Filter/Filter";
import Search from "../../views/Shop/Search/Search";
import "./Shop.css";

const product = {
  image: "../../../images/wine2.jpg",
  name: "AM Wine",
  price: "5000",
  avail: 5,
  url: '1234'
};
const products = [
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
];

export default function Shop() {
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [])
  return (
    <div className="shop">
      <div className = 'filterSub'>

      </div>
      <div className = 'filterC'>
      <Filter />
      </div>
      <div className="filterContainer">
        
      </div>
      <div className="productCollection">
        <div className="detailPlusSort">
          <h3>Showing 1-12 of 83 results</h3>
        </div>
        {products.map((product, i) => {
          return <Product key={i} product={product} />;
        })}
      </div>
     
    </div>
  );
}
