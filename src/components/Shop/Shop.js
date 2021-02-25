import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Product from "../../views/ProductView/Product/Product";
import Filter from "../../views/Shop/Filter/Filter";
import Search from "../../views/Shop/Search/Search";
import "./Shop.css";

const mapStateToProps = state=>{
  return {
    products: state.product.products,
    user:state.user.user
  }
}

function Shop({products, user}) {
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
          return <Product user = {user} key={i} product={product} />;
        })}
      </div>
     
    </div>
  );
}
export default  connect(mapStateToProps)(Shop)
