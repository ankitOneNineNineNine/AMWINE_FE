import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Cart.css";

const mapStateToProps = (state) => {
  return {
    cart_p: state.cart.products,
  };
};

function Cart({ cart_p }) {
  return (
    <Link to="/cart">
      <div className="cartContainer">
        <i className="fa fa-shopping-cart fa-2x"></i>
        <span>{cart_p.length || 0}</span>
      </div>
    </Link>
  );
}
export default connect(mapStateToProps)(Cart);
