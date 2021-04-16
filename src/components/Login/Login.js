import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import {post} from '../../utilities/http'
import { connect } from "react-redux";
import { setUser } from "../../reduxMgmt/actions/actions";
import { failureNotification, successNotification } from "../../utilities/toast";
import { isAuthorized } from "../../utilities/auth.middleware";
const loginFormDetails = {
  eoru: "",
  password: "",
};



//mapDispatchToProps
const mapDispatchToProps = (dispatch) => {
  return {
    saveUserToStore: (user) => dispatch(setUser(user)),
  };
};

function Login({history, saveUserToStore}) {
  const [formDetails, setFormDetails] = useState({ ...loginFormDetails });
  const [submitClicked, setSubmitClicked] = useState(false)
  function formChange(e) {
    let { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  }

  async function login(e) {
    e.preventDefault();
    setSubmitClicked(true)
    try{
      let details = await post('/auth/signin', {body: formDetails});
      localStorage.setItem("i_hash", JSON.stringify(details.token));
      saveUserToStore(details.user);
      successNotification(`Welcome ${details.user.userName}`);
      if(isAuthorized(details.user)){
        successNotification(`Hello Admin!`);
      }
      history.push("/AMWINE_FE");
    }
    catch(e){
      failureNotification(e.response.data.msg)
      setSubmitClicked(false)
    }
  }
  return (
    <div className="login">
      <h2>Login</h2>
      <form className="loginForm" method="post" onSubmit={login}>
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

        <button className="loginButton" onClick={login} style = {submitClicked? {backgroundColor: 'gray'}: null} disabled = {submitClicked}>
          Login
        </button>
      </form>
      <div className="others">
        <p>
          Don't Have an Account? Click <Link to="/Join"> Here</Link>
        </p>
        <p>
          Forgot your password? Click <Link to="/forgot-password">Here</Link>
        </p>
      </div>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(Login)