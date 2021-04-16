import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./CartContents.css";
import Wine from "../../images/wine.png";
import { setCart, setUser } from "../../reduxMgmt/actions/actions";
import { get, post, put } from "../../utilities/http";
import { productPicUrl } from "../../utilities/urls";
import {
  failureNotification,
  successNotification,
  warningNotification,
} from "../../utilities/toast";
import { Link } from "react-router-dom";
import AddressInput from "../AddressInput/AddressInput";
import Modal from "../../Modal/Modal";
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    products: state.product.products,
    cart_p: state.cart.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveProductsToCart: (products) => dispatch(setCart(products)),
    saveUserToState: (user) => dispatch(setUser(user)),
  };
};
function CartContents({
  user,
  products,
  cart_p,
  saveProductsToCart,
  saveUserToState,
}) {
  const [productSelected, setProductsSelected] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [qty, setQty] = useState({});
  const [showModel, setShowModel] = useState(false);
  const [addressFormDetails, setAddressFormDetails] = useState({});
  const [checkedOut, setCheckedOut] = useState(false);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,

    });
    setSubTotal(productSelected.reduce((a, sP) => a + sP.qty * sP.price, 0));
  }, [productSelected]);
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
    setSubTotal(productSelected.reduce((a, sP) => a + sP.qty * sP.price, 0));
  };
  const removePFromCart = async (product) => {
    let products = cart_p;
    let nowProduct = product._id;
    products.splice(products.indexOf(nowProduct), 1);

    let pIDs = products.map((p) => p._id);
    if (!localStorage.getItem("i_hash")) {
      localStorage.setItem("cart_p", JSON.stringify(pIDs));
    } else {
      let formData = new FormData();
      formData.append("action", "remove");
      formData.append("cart", product._id);
      let user = await put(
        "/user",
        { body: formData },
        true,
        "multipart/form-data"
      );
      saveUserToState(user);
    }
    saveProductsToCart(products);
    successNotification("Removed to cart");
    setSubTotal(productSelected.reduce((a, sP) => a + sP.qty * sP.price, 0));
  };
  const selectProduct = (e) => {
    // console.log(e.target.name, e.target.checked, i)
    let { name, checked, value } = e.target;
    if (checked) {
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
        failureNotification("Select Quantity")
      }
    } else {
      let product = productSelected;
      product.splice(
        product.findIndex((p) => p.p === value),
        1
      );
      setProductsSelected(product);
    }
    setSubTotal(productSelected.reduce((a, sP) => a + sP.qty * sP.price, 0));
  };
  
  const checkout = (e) => {
    e.preventDefault();
    if(Object.keys(addressFormDetails).length!== 5){
      setShowModel(true);
      return;
    }
     
  
     if (localStorage.getItem("i_hash")) {
       if (productSelected.length) {
        setCheckedOut(true);
         let bodyForPost = {
           productReq: productSelected,
           subTotal,
           shippingCharge: 150,
           address: addressFormDetails.address,
           city: addressFormDetails.city,
           state: addressFormDetails.state,
           postalCode: addressFormDetails.postalCode,
           country: addressFormDetails.country,
         };
         post("/bought", { body: bodyForPost }, true)
           .then((msg) => {
             productSelected.forEach((pr) => {
               let prId = pr.p;
               cart_p.splice(
                 cart_p.findIndex((pr) => pr._id === prId),
                 1
               );
               saveProductsToCart(cart_p);
               setCheckedOut(false);
             });
             successNotification(msg);
           })
           .catch((err) => {failureNotification("Some Error Occured!");   setCheckedOut(false);});
       } else {
         failureNotification("Select the Product first!");
       }
     } else {
       failureNotification("Please Login First!");
     }
  

  };

  let tPrice = subTotal ? subTotal + 150 : 0;


  const addressFilled= Object.keys(addressFormDetails).length=== 5;

  return (
    <div className="cartContents">
      {
        showModel && 
        <Modal>
          <AddressInput setShowModal = {setShowModel} setAddressFormDetails = {setAddressFormDetails}/>
        </Modal>
      }
      
      <h2>Cart</h2>
   

      <div className="productsInCart">
        {cart_p.map((product, i) => {
          return (
            <div key={i} className="cartProduct">
              {
                (product.quantity - (product.sold||0))? 
                null:
                <div className = 'out-of-stock'>
                <p>Out-of-Stock</p>
                </div>
              }
              <img
                src={product.images[0]}
                className="pInCartImg"
              />
              <span className="trash" onClick={() => removePFromCart(product)}>
                <i className="fa fa-trash "></i>
              </span>
              
              {
                qty[product._id]>0?
                <input
                type="checkbox"
                className="selectChecboxCart"
                value={product._id}
                onChange={selectProduct}
                price={product.price}
              />
            :null}
              <div className="cartProductDetails">
                <Link key={i} to={`/shop/${product._id}`}>
                  <div className="p_name">
                    <span>{product.name}</span>
                  </div>
                </Link>
                <div className="remDetailsPCart">
                  <div className="quantityAddToCart">
                    <span className="quantity">
                      Quantity:{" "}
                      <input
                        type="number"
                        onChange={selectQty}
                        name={product._id}
                        min={0}
                        defaultValue={0}
                        max = {product.quantity - (product.sold||0)}
                      />
                    </span>
                  </div>

                  <span className="pCartPrice">Price: {product.price}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="checkOut">
        <h2>Order Summary</h2>
        <table>
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>Rs. {subTotal}</td>
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

        <button onClick={checkedOut? null:checkout} className={"proceedToCheckout " + (checkedOut? "clicked": 'null')}>
          {addressFilled? "Checkout": "Enter Full Address"}
        </button>
      </div>
      {
        addressFilled? 
        <div className = 'addressToDeliver'>
        <h2>Address Information</h2>
        <h4>Address: {addressFormDetails?.address}</h4>
        <h4>City: {addressFormDetails?.city}</h4>
        <h4>State: Bagmati {addressFormDetails?.state}</h4>
        <h4>PostalCode: {addressFormDetails?.postalCode}</h4>
        <h4>Country: {addressFormDetails?.country}</h4>
      </div>
      :null}

    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContents);
