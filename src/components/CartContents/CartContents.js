import React from "react";
import { connect } from "react-redux";
import "./CartContents.css";
import Wine from '../../images/wine.png'
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

function Cart() {
  return (
    <div className="cartContents">
      <div className = 'productsInCart'>
      <div className = 'cartProduct'>
            <input type="checkbox" id="vehicle1" name="product" value="P1" />
          <img src = {Wine} className = 'pInCartImg' />
            <span>Product Name</span>
            <span className = 'pCartPrice'>Price</span>
      </div>
      <br />
      <div className = 'cartProduct'>
            <input type="checkbox" id="vehicle1" name="product" value="P1" />
          <img src = {Wine} className = 'pInCartImg' />
            <span>Product Name</span>
            <span className = 'pCartPrice'>Price</span>
      </div>
      <br />
      <div className = 'cartProduct'>
            <input type="checkbox" id="vehicle1" name="product" value="P1" />
          <img src = {Wine} className = 'pInCartImg' />
            <span>Product Name</span>
            <span className = 'pCartPrice'>Price</span>
      </div>
      <br />
      </div>
      <div className = 'checkOut'>
        
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Cart);
