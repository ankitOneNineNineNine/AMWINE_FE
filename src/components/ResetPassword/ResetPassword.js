import React from "react";
import { post } from "../../utilities/http";
import {
  failureNotification,
  successNotification,
} from "../../utilities/toast";
import "./ResetPassword.css";

export default class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      password: null,
      confirmPassowrd: null,
      submitted: false,
    };
  }
  formChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  reset = (e) => {
    e.preventDefault();
    this.setState({
      submitted: true,
    });
    if (!this.state.password) {
      failureNotification("Please enter the password");
      return;
    }

    if (this.state.password.length < 8) {
      failureNotification("Password should be greater than 8 length");
      return;
    }
    if (this.state.password !== this.state.confirmPassword) {
      failureNotification("Password do not match");
      return;
    }
    let token = this.props.match.params["token"];
    post(`/auth/reset-password/${token}`, {
      body: {
        password: this.state.password,
      },
    })
      .then((data) => {
        this.setState({
          submitted: false,
        });
        successNotification("Succesfully Resetted!");
        this.props.history.push("/login");
      })
      .catch((err) => {
        let errMsg = err.response.data.msg;
        failureNotification(errMsg);
      });
  };

  render() {
    return (
      <div className="rPassword">
        <h2>Reset Password</h2>
        <form className="rPasswordForm" method="post" onSubmit={this.reset}>
          <label>Password</label>
          <input
            onChange={this.formChange}
            type="password"
            name="password"
            value={this.password}
          />
          <label>Confirm password</label>
          <input
            onChange={this.formChange}
            type="password"
            name="confirmPassword"
            value={this.confirmPassowrd}
          />
          <button
            className={"rPasswordButton " + (this.submitted ? "clicked" : null)}
            onClick={this.submitted ? null : this.reset}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
