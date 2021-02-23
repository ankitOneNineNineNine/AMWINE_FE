import React, { useRef, useState } from "react";
import "./PostAds.css";

const postAdFormDetails = {
  title: "",
  image: "",
};
export default function PostAds() {
  const adImage = useRef(null);
  const [formDetails, setFormDetails] = useState({ ...postAdFormDetails });
  const formChange = (e) => {
    let { value, name } = e.target;
    if (name === "image") {
      setFormDetails({ ...formDetails, image: e.target.files[0] });
    } else {
      setFormDetails({
        ...formDetails,
        [name]: value,
      });
    }
  };
  const post = (e) => {
    e.preventDefault();
    console.log(formDetails);
  };

  return (
    <div className="postAds">
      <h2>Post Ad</h2>
      <form className="adForm" method="post" onSubmit={post}>
        <label>Title</label>
        <input
          onChange={formChange}
          type="text"
          name="title"
          defaultValue={formDetails.name}
        />
        <label>Image</label>
        <input
          type="file"
          className="adImage"
          ref={adImage}
          name="image"
          onChange={formChange}
        />
        <button className="postAdButton" onClick={post}>
          Post
        </button>
      </form>
    </div>
  );
}
