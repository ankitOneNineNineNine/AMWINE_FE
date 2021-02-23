import React, { useRef, useState } from "react";
import "./UpdateProduct.css";
import {
  failureNotification,
  successNotification,
} from "../../../../utilities/toast";
const updateProductDetails = {
  name: "",
  price: 0,
  quantity: 0,
  description: "",
  images: [],
};

export default function UpdateProduct() {
  const productImage = useRef(null);
  const [formDetails, setFormDetails] = useState({ ...updateProductDetails });
  const formChange = (e) => {
    let { name, value } = e.target;
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
  const update = (e) => {
    e.preventDefault();

    console.log(formDetails);
  };
 
  const updateMoreImage = () => {
    productImage.current.click();
  };
  return (
    <div className="updateProduct">
      <h2>Update Product</h2>
      <form className="productForm" method="post" onSubmit={update}>
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
          defaultValue={formDetails.price}
        />
        <label>Description</label>
        <textarea
          rows="10"
          cols="30"
          onChange={formChange}
          name="description"
          defaultValue={formDetails.description}
        />
        <label>Images</label>
        <input
          type="file"
          className="pImageupdate"
          ref={productImage}
          name="images"
          onChange={formChange}
          multiple="multiple"
        />
        <div className="imageSelectedForProduct">
          <div className="updateMoreImageForProduct" onClick={updateMoreImage}>
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
        <button className="productUpdateButton" onClick={update}>
          Update
        </button>
      </form>
    </div>
  );
}
