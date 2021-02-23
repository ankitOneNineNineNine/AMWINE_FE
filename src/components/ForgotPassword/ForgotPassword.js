import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { failureNotification, successNotification } from '../../utilities/toast';
import './ForgotPassword.css'



export default function ForgotPassword(){
    const [email, setEmail] = useState("")
    function formChange(e) {
      let {  value } = e.target;
      setEmail(value)
    }
    function forgotPassword(e) {
      e.preventDefault();
        let msg;
        let {emailTest} = validate();
        if (!emailTest) {
          msg = "Please enter the valid email";
          failureNotification(msg);
        }
       else{

       }
        
      }

    function validate(){
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailTest = re.test(email.toLowerCase());
        return {
            emailTest
        };
    }
   
    return (
        <div className="fPassword">
        <h2>Forgot Password</h2>
        <form className="fPasswordForm" method="post" onSubmit={forgotPassword}>
          <label>Email</label>
          <input
            onChange={formChange}
            type="email"
            name="email"
            defaultValue={email}
          />
          <button className="fPasswordButton" onClick={forgotPassword}>
          Submit
        </button>
        </form>
        <div className="others">
          <p>
           Don't Have an Account? Click <Link to="/Join"> Here</Link>
          </p>
          <p>
            Go back to Login? Click <Link to="/login"> Here</Link>

          </p>
        </div>
      </div>
    )
}