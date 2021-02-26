import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { productPicUrl } from "../../../utilities/urls";
import { isAuthorized } from "../../../utilities/auth.middleware";
import { setCart } from "../../../reduxMgmt/actions/actions";
import { connect } from "react-redux";
import {
  successNotification,
  warningNotification,
} from "../../../utilities/toast";
const mapStateToProps = (state) => {
  return {
    cart_p: state.cart.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveCartPToState: (products) => dispatch(setCart(products)),
  };
};
function Product({ product, user, saveCartPToState, cart_p }) {
  const productURL = "/shop/" + product._id;
  const picUrl = productPicUrl + "/" + product.images[0];

  const addToCart = (p) => {
    if (cart_p.indexOf(p._id) > -1) {
      warningNotification("Already in the cart");
      return;
    }

    let item = cart_p;
    item.push(p);
    if (!Object.keys(user).length) {
      localStorage.setItem("cart_p", JSON.stringify(item));
    }
    saveCartPToState(item);
    successNotification("Addedd to cart");
  };
  return (
    <div className="product">
      <Link to={productURL}>
        <div className="imageContainer">
          <div
            className="bgImage"
            style={{
              backgroundImage: product.images.length
                ? "url(" + picUrl + ")"
                : null,
            }}
          ></div>
        </div>
      </Link>
      <div className="desc">
        <Link to={productURL}>
          {" "}
          <h2 className="productName">{product.name}</h2>{" "}
        </Link>
        <div className="descrip">
          <span className="productPrice">Price: NRs. {product.price}</span>
          {isAuthorized(user) ? (
            <Link to={`admin/post/updateProduct/${product._id}`}>
              <button className="updateButton">Update</button>
            </Link>
          ) : (
            <div className="addToCart" onClick={() => addToCart(product)}>
              <button
                className="addToCartButton"
                style={
                  cart_p.findIndex((p) => p._id === product._id) > -1
                    ? { backgroundColor: "white", color: "black" }
                    : null
                }
              >
                <i className="fa fa-cart-plus fa-2x"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  React.memo(Product, (props, nextProps) => {
    if (props.cart_p === nextProps.cart_p) return true;
  })
);
