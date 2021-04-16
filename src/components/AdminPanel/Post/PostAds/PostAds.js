import React, { useRef, useState } from "react";
import { post } from "../../../../utilities/http";
import {
  failureNotification,
  successNotification,
} from "../../../../utilities/toast";
import "./PostAds.css";

const postAdFormDetails = {
  title: null,
  image: null,
};
export default function PostAds({ history }) {
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
  const postAd = (e) => {
    e.preventDefault();
    if (!formDetails.image) {
      failureNotification("Add an Image please");
      return;
    }
    let formData = new FormData();
    if (formDetails.title) formData.append("title", formDetails.title);
    if (formDetails.image) formData.append("image", formDetails.image);
    post("/ad", { body: formData }, true, "multipart/form-data")
      .then((data) => {
        successNotification("Posted");
        history.push("/AMWINE_FE");
      })
      .catch((err) => failureNotification("Some Error Occured"));
  };

  return (
    <div className="postAds">
      <h2>Post Ad</h2>
      <form className="adForm" method="post" onSubmit={postAd}>
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
        <button className="postAdButton" onClick={postAd}>
          Post
        </button>
      </form>
    </div>
  );
}
