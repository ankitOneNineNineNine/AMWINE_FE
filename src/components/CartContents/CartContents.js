import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./CartContents.css";
import Wine from "../../images/wine.png";
import { setUser } from "../../reduxMgmt/reducers/reducers";
import { get } from "../../utilities/http";
import { productPicUrl } from "../../utilities/urls";
import { warningNotification } from "../../utilities/toast";
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    products: state.product.products,
    cart_p: state.cart.products,
  };
};

function CartContents({ user, products, cart_p }) {
  const [productSelected, setProductsSelected] = useState([]);
  const [qty, setQty] = useState({});
  useEffect(() => {
    console.log(productSelected);
  });
  const selectQty = (e) => {
    let { name, value } = e.target;

    let qtyT = { ...qty };
    let pInd = productSelected.findIndex((p) => p.p === name);
    if (pInd > -1) {
      let pcheck = [...productSelected];
      pcheck[pInd]["qty"] = +value;
      setProductsSelected(pcheck);

      return;
    }

    if (qtyT[name] >= 0) {
      qtyT[name] = value;
      setQty(qtyT);
    } else {
      setQty({ ...qty, [name]: value });
    }
  };
  const selectProduct = (e) => {
    // console.log(e.target.name, e.target.checked, i)
    let { name, checked, value } = e.target;

    if (qty[value]) {
      setProductsSelected([
        ...productSelected,
        {
          p: value,
          qty: qty[value],
          price: +e.target.attributes[2].value,
        },
      ]);
    } else {
      setProductsSelected([
        ...productSelected,
        {
          p: value,
          qty: 1,
          price: +e.target.attributes[2].value,
        },
      ]);
    }
  };

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
  let sTPrice = productSelected.reduce((a, sP) => a + sP.qty * sP.price, 0);
  let tPrice = sTPrice ? sTPrice + 150 : 0;
  return (
    <div className="cartContents">
      <h2>Cart</h2>

      <div className="productsInCart">
        {cart_p.map((product, i) => {
          return (
            <div key={i}>
              <div className="cartProduct">
                <img
                  src={`${productPicUrl}/${product.images[0]}`}
                  className="pInCartImg"
                />
                <span className="trash">
                  <i className="removeFromCart fa fa-trash fa-2x"></i>
                </span>
                <input
                  type="checkbox"
                  className="selectChecboxCart"
                  value={product._id}
                  onChange={selectProduct}
                  price={product.price}
                />
                <div className="cartProductDetails">
                  <div className="p_name">
                    <span>{product.name}</span>
                  </div>
                  <div className="remDetailsPCart">
                    <span className="quantity">
                      Quantity:{" "}
                      <input
                        type="number"
                        onChange={selectQty}
                        name={product._id}
                        min={1}
                        defaultValue={1}
                        max={product.quantity}
                      />
                    </span>
                    <span className="pCartPrice">{product.price}</span>
                  </div>
                </div>
              </div>
              <br />
            </div>
          );
        })}
      </div>
      <div className="checkOut">
        <h2>Order Summary</h2>
        <table>
          <tbody>
            <tr>
              <td>Subtotal (x items)</td>
              <td>Rs. {sTPrice}</td>
            </tr>
            <tr>
              <td>Shipping Fee</td>
              <td>Rs. 150</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>Rs. {tPrice}</td>
            </tr>
          </tbody>
        </table>

        <button onClick={checkout} className="proceedToCheckout">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(
  React.memo(CartContents, (props, nextProps) => {
    if (props.cart_p === nextProps.cart_p) {
      return true;
    }
  })
);
