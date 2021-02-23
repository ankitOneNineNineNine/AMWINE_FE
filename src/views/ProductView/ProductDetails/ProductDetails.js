import React from "react";
import "./ProductDetails.css";
import Product from "../Product/Product";

const product = {
  image: "../../../images/wine2.jpg",
  name: "AM Wine",
  price: "5000",
  avail: 5,
  url: "1234",
};
const products = [product, product, product, product];

export default function ProductDetails() {
  return (
    <div className="productDetails">
      <div className="aboutProduct">
        <div className="dImageContainer"></div>
        <div className="ddetails">
          <h2>Product Name</h2>
          <h3>Price: Nrs. 5000</h3>
          <div className="pDescription">
            <p>Grape Wine</p>
            <p>Grape Wine</p>
            <p>Grape Wine</p>
            <p>Grape Wine</p>
          </div>
          <hr />
          <button>Add to Cart</button>
          <hr />
        </div>
      </div>
      <div className="otherProducts">
        <h2>Similar Products</h2>
        {products.map((product, i) => {
          return <Product key = {i} product={product} />;
        })}
      </div>
    </div>
  );
}
