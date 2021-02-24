import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./CartContents.css";
import Wine from '../../images/wine.png'
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

function Cart() {

  const [productSelected,setProductsSelected] = useState([]);

  const selectProduct = (e, i)=>{
    // console.log(e.target.name, e.target.checked, i)
    let {name, checked} = e.target;
    console.log(checked, i)
    if(checked){
      setProductsSelected([...productSelected, i])
    }
    else{
      let productS = productSelected;
      productS.splice(i, 1);
      setProductsSelected(productS)
    }
  }

  const checkout = e =>{
    e.preventDefault();
    console.log(productSelected)

  }
  const checkAll = e =>{
    if(e.target.checked){
      setProductsSelected([0,2,3])
    }
    else{
      setProductsSelected([])
    }
  }

  return (
    <div className="cartContents">
      <h2>Cart</h2>
      
      <div className = 'productsInCart'>
      <div className = 'cartProduct'>
            <input type="checkbox" id="vehicle1" name="product" value="P1" onChange = {(e)=>selectProduct(e, 0)}  />
          <img src = {Wine} className = 'pInCartImg' />
            <span>Product Name</span>
            <span className = 'pCartPrice'>Price</span>
      </div>
      <br />
      <div className = 'cartProduct'>
            <input type="checkbox" id="vehicle1" name="product" value="P2" onChange = {(e)=>selectProduct(e, 2)}  />
          <img src = {Wine} className = 'pInCartImg' />
            <span>Product Name</span>
            <span className = 'pCartPrice'>Price</span>
      </div>
      <br />
      <div className = 'cartProduct'>
            <input type="checkbox" id="vehicle1" name="product" value="P3" onChange = {(e)=>selectProduct(e, 3)}  />
          <img src = {Wine} className = 'pInCartImg' />
            <span>Product Name</span>
            <span className = 'pCartPrice'>Price</span>
      </div>
      <br />
      </div>
      <div className = 'checkOut'>
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
          
          <button onClick={checkout} className = 'proceedToCheckout'>Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Cart);
