import React, { useRef, useState } from "react";
import "./AddProduct.css";
import {
  failureNotification,
  successNotification,
} from "../../../../utilities/toast";
import { post } from "../../../../utilities/http";
import { setProducts } from "../../../../reduxMgmt/actions/actions";
import { connect } from "react-redux";
const addProductFormDetails = {
  name: null,
  price: null,
  quantity: null,
  images: [],
  pType: "wine",
  variety: null,
};

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveProductToState: (products) => dispatch(setProducts(products)),
  };
};

function AddProduct({ products, saveProductToState, history }) {
  const productImage = useRef(null);
  const [formDetails, setFormDetails] = useState({ ...addProductFormDetails });
  const formChange = (e) => {
    let { name, value } = e.target;
    if (name === "price" || name === "quantity") {
      value = +value;
    }
    if (name === "images") {
      let images = formDetails.images;
      images.push(e.target.files[0]);
      setFormDetails({ ...formDetails, images });
    } else {
      setFormDetails({ ...formDetails, [name]: value });
    }
  };
  const deleteImage = (i) => {
    let images = formDetails.images;
    images.splice(i, 1);
    setFormDetails({ ...formDetails, images });
  };
  const add = async (e) => {
    e.preventDefault();
    let test = validate();
    let formData = new FormData();
    let { name, price, variety, pType, quantity, images } = formDetails;
    if (name) formData.append("name", name);
    if (price) formData.append("price", price);
    if (variety) formData.append("variety", variety);
    if (pType) formData.append("pType", pType);
    if (quantity) formData.append("quantity", quantity);
    if (images.length) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }
    if (test) {
      let product = await post(
        "/authProduct/",
        { body: formData },
        true,
        "multipart/form-data"
      );
      let prod = products;
      prod.push(formDetails);
      saveProductToState(prod);
      successNotification("Successfully Added");
      history.push('/')
    }
  };
  const validate = () => {
    for (const item in formDetails) {
      if (!formDetails[item]) {
        failureNotification(`${item} should be present`);
        return false;
      }
    }
    return true;
  };
  const addMoreImage = () => {
    productImage.current.click();
  };
  return (
    <div className="addProduct">
      <h2>Add Product</h2>

      <form className="productForm" method="post" onSubmit={add}>
        <label>Name</label>
        <input
          onChange={formChange}
          type="text"
          name="name"
          defaultValue={formDetails.name}
        />
        <label>Price</label>
        <input
          type="number"
          onChange={formChange}
          name="price"
          defaultValue={formDetails.price}
        />
        <label>Quantity</label>
        <input
          type="number"
          onChange={formChange}
          name="quantity"
          defaultValue={formDetails.quantity}
        />
        <label>Variety</label>
        <input
          onChange={formChange}
          name="variety"
          placeholder="Sparkling, Red, Sweet, Rose, etc."
          defaultValue={formDetails.variety}
        />
        <label>Type</label>
        <select name="pType">
          <option value="wine">Wine</option>
          <option value="beer">Beer</option>
        </select>
        <label>Images</label>
        <input
          type="file"
          className="pImageAdd"
          ref={productImage}
          name="images"
          onChange={formChange}
          multiple="multiple"
        />
        <div className="imageSelectedForProduct">
          <div className="addMoreImageForProduct" onClick={addMoreImage}>
            <i className="addMoreIcon fa fa-plus fa-2x" />
          </div>
          {formDetails.images.map((image, i) => {
            return (
              <div key={i} className="individualImageContainer">
                <img
                  className="individualImages"
                  src={URL.createObjectURL(image)}
                />
                <i
                  className="deleteImage fa fa-trash"
                  onClick={() => deleteImage(i)}
                />
              </div>
            );
          })}
        </div>
        <button className="productAddButton" onClick={add}>
          Add
        </button>
      </form>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
