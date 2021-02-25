import React, { useRef, useState } from "react";
import "./ProfileUpdate.css";
import { connect } from "react-redux";
import { put } from "../../../utilities/http";
import { setUser } from "../../../reduxMgmt/actions/actions";
import { profilePicUrl } from "../../../utilities/urls";
import { successNotification } from "../../../utilities/toast";
import { withRouter } from "react-router-dom";
import Wine from '../../../images/wine.png'

const updateFormDetails = {
  fullName: null,
  address: null,
  number: null,
  image: null,
  password: null,
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveUserToState: (user) => dispatch(setUser(user)),
  };
};
function ProfileUpdate({ user, saveUserToState, history }) {
  const imageChange = useRef(null);
  const [formDetails, setFormDetails] = useState({ ...updateFormDetails });

  const detailsChange = (e) => {
    let { name, value, type } = e.target;
    if (type === "file") {
      value = e.target.files[0];
    }
    setFormDetails({ ...formDetails, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (formDetails.fullName) formData.append("fullName", formDetails.fullName);
    if (formDetails.number) formData.append("number", formDetails.number);
    if (formDetails.address) formData.append("address", formDetails.address);
    if (formDetails.password) formData.append("password", formDetails.password);
    if (formDetails.image) formData.append("image", formDetails.image);
    let user = await put(
      "/user",
      { body: formData },
      true,
      "multipart/form-data"
    );
    if (user) {
      saveUserToState(user);
      successNotification("Successfully Updated!");
      history.push(`/profile/${user._id}`);
    }
  };
  const imageSelect = (e) => {
    e.preventDefault();

    if (!formDetails.image) {
      imageChange.current.click();
    } else {
      setFormDetails({ ...formDetails, image: "" });
    }
  };

  return (
    <div className="">
      <form method="put" onSubmit={submit}>
        <div className="profileUpdator">
          <div className="pImageContainer">
            <img className="pImage" src={user.image? `${profilePicUrl}/${user.image}` : Wine} />

            <i
              className={`uploaderIcon fa ${
                formDetails.image ? "fa-arrow-left" : "fa-camera"
              }`}
              onClick={imageSelect}
            />
          </div>
          <hr />
          <div className="pUpdateContainer">
            <input
              type="file"
              ref={imageChange}
              name="image"
              onChange={detailsChange}
              className="imageSelector"
            ></input>
            <label>FullName</label>
            <h2>
              <input
                type="text"
                className="editor"
                onChange={detailsChange}
                name="fullName"
                placeholder="FullName"
                defaultValue={user.fullName}
              />
            </h2>
            <label>Username</label>
            <p>{user.userName} (Uneditable)</p>
            <label>Email</label>
            <p>{user.email} (Uneditable)</p>
            <label>Address</label>
            <p>
              <input
                type="text"
                className="editor"
                onChange={detailsChange}
                name="address"
                placeholder="Address"
                defaultValue={user.address}
              />
            </p>
            <label>Password</label>
            <p>
              <input
                type="password"
                className="editor"
                onChange={detailsChange}
                name="password"
                placeholder="Password"
                defaultValue={"**********"}
              />
            </p>
            <label>Number</label>
            <p>
              <input
                type="tel"
                className="editor"
                onChange={detailsChange}
                name="number"
                placeholder="Ph. Number"
                defaultValue={user.number}
              />
            </p>
            <label>Image</label>
            <p>
              <input
                type="file"
                className="editor"
                onChange={detailsChange}
                name="image"
                placeholder="image"
              />
              <img
                src={
                  formDetails.image
                    ? URL.createObjectURL(formDetails.image)
                    : user.image? 
                    `${profilePicUrl}/${user.image}`
                    :Wine
                }
                className="editProfileProfileImage"
              />
            </p>
          </div>
          <button className="updateProfileButton" onClick={submit}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileUpdate));
