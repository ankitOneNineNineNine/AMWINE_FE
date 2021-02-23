import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

export default function Product({ product}) {
  const { name, price, image, avail, url} = product;
  const productURL = '/shop/' + url;
 
  return (

    <div className="product">
          <Link to = {productURL}>
      <div className="imageContainer">
        <div
          className="bgImage"
          // style={{
          //   backgroundImage: "url(" + product.image + ")",
          // }}
        ></div>
      </div>
      </Link>
      <div className="desc">
      <Link to = {productURL}>  <h2 className="productName">{name}</h2>  </Link>
        <div className="descrip">
          <span className="productPrice">Price: NRs. {price}</span>
          <div className="addToCart" onClick = {console.log}>
            <input type="number" defaultValue="0" min = '0' max = {avail} />
            <button className="addToCartButton">
              <i className="fa fa-cart-plus fa-2x"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}
