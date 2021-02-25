import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./CartContents.css";
import Wine from "../../images/wine.png";
import { setUser } from "../../reduxMgmt/reducers/reducers";
import { get } from "../../utilities/http";
import { productPicUrl } from "../../utilities/urls";
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    products: state.product.products,
    cart_p: state.cart.products,
  };
};

function Cart({ user, products, cart_p }) {
  const [productSelected, setProductsSelected] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const selectProduct = (e, i) => {
    // console.log(e.target.name, e.target.checked, i)
    let { name, checked } = e.target;
    console.log(checked, i);
    if (checked) {
      setProductsSelected([...productSelected, i]);
    } else {
      let productS = productSelected;
      productS.splice(i, 1);
      setProductsSelected(productS);
    }
  };
  useEffect(() => {
    if (cart_p) {
      cart_p.map((p_id) => {
        get(`/product/${p_id}`).then((product) => {
          setCartProducts([...cartProducts, product]);
        });
      });
    }
  }, [cart_p]);
  const checkout = (e) => {
    e.preventDefault();
    console.log(productSelected);
  };
  const checkAll = (e) => {
    if (e.target.checked) {
      setProductsSelected([0, 2, 3]);
    } else {
      setProductsSelected([]);
    }
  };

  return (
    <div className="cartContents">
      <h2>Cart</h2>

      <div className="productsInCart">
        {cartProducts.map((product) => {
          return (
            <>
              <div className="cartProduct">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="product"
                  value={product._id}
                  onChange={(e) => selectProduct(e, 0)}
                />
                <img
                  src={`${productPicUrl}/${product.images[0]}`}
                  className="pInCartImg"
                />
                <span>{product.name}</span>
                <span className="pCartPrice">{product.price}</span>
              </div>
              <br />
            </>
          );
        })}
      </div>
      <div className="checkOut">
        <h2>Order Summary</h2>
        <table>
          <tr>
            <td>Subtotal (x items)</td>
            <td>Rs. x</td>
          </tr>
          <tr>
            <td>Shipping Fee</td>
            <td>Rs. x</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>Rs. x</td>
          </tr>
        </table>

        <button onClick={checkout} className="proceedToCheckout">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Cart);
