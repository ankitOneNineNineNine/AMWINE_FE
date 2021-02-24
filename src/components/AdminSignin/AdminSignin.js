import React, { useState } from "react";
import { connect } from "react-redux";
import { setUser } from "../../reduxMgmt/actions/user.actions";
import { post } from "../../utilities/http";
import { successNotification } from "../../utilities/toast";
import "./AdminSignin.css";
const adminLoginFormDetails = {
  eoru: "",
  password: "",
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserToState: (user) => dispatch(setUser(user)),
  };
};

function AdminSignin({ saveUserToState, history }) {
  const [formDetails, setFormDetails] = useState({ ...adminLoginFormDetails });
  const [submitClicked, setSubmitClicked] = useState(false);
  const formChange = (e) => {
    let { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const adminLogin = (e) => {
    e.preventDefault();
    post("/adminAuth/signinAdmin", { body: formDetails })
      .then((details) => {
        saveUserToState(details.user);
        successNotification(`Hello Admin ${details.user.userName}`);
        localStorage.setItem("i_hash", JSON.stringify(details.token));
        history.push(`/admin/${details.user._id}`);
      })
      .catch(console.log);
  };

  return (
    <div className="adminLogin">
      <h2>Login</h2>
      <form className="adminLoginForm" method="post" onSubmit={adminLogin}>
        <label>Email or Username</label>
        <input
          onChange={formChange}
          type="text"
          name="eoru"
          defaultValue={formDetails.eoru}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={formChange}
          name="password"
          defaultValue={formDetails.password}
        />

        <button
          className="loginButton"
          onClick={adminLogin}
          style={submitClicked ? { backgroundColor: "gray" } : null}
          disabled={submitClicked}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(AdminSignin);
