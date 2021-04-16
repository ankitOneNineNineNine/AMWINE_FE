import React, { useEffect, useRef, useState } from "react";
import "./UpdateProduct.css";
import {
  failureNotification,
  successNotification,
} from "../../../../utilities/toast";
import { get, put } from "../../../../utilities/http";
import { setProducts } from "../../../../reduxMgmt/actions/actions";
import { productPicUrl } from "../../../../utilities/urls";
const updateProductDetails = {
  name: null,
  price: null,
  quantity: null,
  images: [],
  pType: "wine",
  variety: null,
};

export default function UpdateProduct({match, history}) {
  const [product, setProduct] = useState(null);
  const productImage = useRef(null);
  const [formDetails, setFormDetails] = useState({ ...updateProductDetails });
  const [alreadyImage, setAlreadyImage] = useState([])
  const [removeImage, setRemoveImage] = useState([])
  useEffect(()=>{
      get(`/product/${match.params.id}`)
      .then(product=>{
        setProduct(product);
        setAlreadyImage(product.images)
        setFormDetails({
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          images: [],
          pType: product.pType,
          variety: product.variety,

        })
      })
      .catch(err => failureNotification("Some Failure Occured!"))
    }, [])
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
  const update = async (e) => {
    e.preventDefault();
  
    let { name, price, variety, pType, quantity, images } = formDetails;
    let formData = new FormData();
    if (name && name.length) formData.append("name", name);
    if (price) formData.append("price", price);
    if (variety) formData.append("variety", variety);
    if (pType) formData.append("pType", pType);
    if (quantity) formData.append("quantity", quantity);
    if(removeImage.length) {
      formData.append("removeImage[]", removeImage)
    }
    if (images.length) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }
    let updatedProduct = await put(
      `/product/${match.params.id}`,
      { body: formData },
      true,
      "multipart/form-data"
    );
    history.push(`/shop/${product._id}`)
  };
 const removeAlreadyImage = (image) =>{
   setRemoveImage([...removeImage, image]);
   let removeImg = alreadyImage;
   removeImg.splice(alreadyImage.indexOf(image),1);
   setAlreadyImage(removeImg)
 }
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
        <select name="pType" onChange = {formChange} defaultValue = {formDetails.pType}>
          <option value="wine">Wine</option>
          <option value="beer">Beer</option>
        </select>
      
          <label>Present Images</label>
          <div className="imageSelectedForProduct">
          {alreadyImage.map((image, i) => {
            return (
              <div key={i} className="individualImageContainer">
                <img
                  className="individualImages"
                  src = {image}
                />
                <i
                  className="deleteImage fa fa-trash"
                  onClick={() => removeAlreadyImage(image)}
                />
              </div>
            );
          })}
        </div>
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
          <div className="addMoreImageForProduct" onClick={updateMoreImage}>
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
