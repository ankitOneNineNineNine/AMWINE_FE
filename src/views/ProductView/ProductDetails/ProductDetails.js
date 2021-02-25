import React from "react";
import "./ProductDetails.css";
import Product from "../Product/Product";
import { connect } from "react-redux";

const mapStateToProps = state=>{
  return {
    products: state.product.products,
    user: state.user.user
  }
}

function ProductDetails({products, user}) {
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
          return <Product user = {user}  key = {i} product={product} />;
        })}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(ProductDetails);