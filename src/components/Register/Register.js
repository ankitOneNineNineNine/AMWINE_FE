import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import {
  failureNotification,
  successNotification,
} from "../../utilities/toast";
import { get, post } from "../../utilities/http";
import { connect } from "react-redux";
import { setUser } from "../../reduxMgmt/actions/user.actions";

//mapStatetoProps
const mapStatetoProps = (state) => {
  return {
    user: state.user,
  };
};

//mapDispatchToProps
const mapDispatchToProps = (dispatch) => {
  return {
    saveUserToStore: (user) => dispatch(setUser(user)),
  };
};

const registerFormDetails = {
  userName: "",
  fullName: "",
  email: "",
  password: "",
  number: "",
};

function Register({ saveUserToStore, history, user }) {
  const [formDetails, setFormDetails] = useState({ ...registerFormDetails });
  const [submitClicked, setSubmitClicked] = useState(false)
  function formChange(e) {
    let { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  }
  useEffect(() => {
    if (Object.keys(user).length) {
      successNotification(`Welcome ${user.userName}`);
      history.push("/");
    }
  }, [user]);

  async function register(e) {
    e.preventDefault();
    let test = await validate();
    setSubmitClicked(true)
    let msg;

    if (test.msg.length) {
      msg = test.msg;
      failureNotification(msg);
    } else {
      try{
        let details = await post("/auth/signup", { body: formDetails });
      localStorage.setItem("i_hash", JSON.stringify(details.token));
      saveUserToStore(details.user);
      }
      catch(e){
        failureNotification(e)
        setSubmitClicked(false)
      }
    }
  }

  async function validate() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let test = re.test(formDetails.email.toLowerCase());

    if (!test) {
      return {
        msg: "Invalid Email",
      };
    }

    test = formDetails.password.length > 8 ? true : false;
    if (!test) {
      return {
        msg: "Password Length should be greater than 8",
      };
    }
    test = formDetails.userName.length > 5 ? true : false;
    if (!test) {
      return {
        msg: "UserName length should be greater than 5",
      };
    }
    test = formDetails.userName.indexOf(" ") < 0 ? true : false;
    if (!test) {
      return {
        msg: "Username should not contain white spaces",
      };
    }

    let users = await get("/auth/");

    if (users.length > 0) {
      let eIndex, uIndex;
      eIndex = users.findIndex((user) => user.email === formDetails.email);

      uIndex = users.findIndex((user) => user.email === formDetails.userName);
      if (eIndex > -1 || uIndex > -1) {
        return {
          msg: "User already Exists",
        };
      }
    }

    return {
      msg: "",
    };
  }
  return (
    <div className="register">
      <h2>Register</h2>
      <p>
        <span className="necessary">*</span> fields are important
      </p>
      <form className="registerForm" method="post" onSubmit={register}>
        <label>
          Full Name <span className="necessary">*</span>
        </label>
        <input
          type="text"
          onChange={formChange}
          name="fullName"
          defaultValue={formDetails.fullName}
        />
        <label>
          Username <span className="necessary">*</span>
        </label>
        <input
          onChange={formChange}
          type="text"
          name="userName"
          defaultValue={formDetails.userName}
        />
        <label>
          Email <span className="necessary">*</span>
        </label>
        <input
          onChange={formChange}
          type="email"
          name="email"
          defaultValue={formDetails.email}
        />
        <label>
          Password <span className="necessary">*</span>
        </label>
        <input
          type="password"
          onChange={formChange}
          name="password"
          defaultValue={formDetails.password}
        />
        <label>Ph. Number</label>
        <input
          type="tel"
          onChange={formChange}
          name="number"
          defaultValue={formDetails.number}
        />
        <button className="registerButton" style = {submitClicked? {backgroundColor: 'gray'}: null} onClick={register} disabled = {submitClicked}>
          Register
        </button>
      </form>
      <div className="others">
        <p>
          Already Have an Account? Click <Link to="/login"> Here</Link>
        </p>
      </div>
    </div>
  );
}

export default connect(mapStatetoProps, mapDispatchToProps)(Register);
