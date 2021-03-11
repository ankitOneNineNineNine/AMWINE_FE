import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { post } from '../../utilities/http';
import { failureNotification, successNotification } from '../../utilities/toast';
import './ForgotPassword.css'



export default function ForgotPassword({history}){
    const [eoru, setEoru] = useState("");
    const [submitted, setSubmitted] = useState(false)
    function formChange(e) {
      let {  value } = e.target;
      setEoru(value)
    }
    function forgotPassword(e) {
     
      e.preventDefault();
      if(eoru){
        setSubmitted(true);
        post('/auth/forgot-password', {body: {
        eoru,
      }})
      .then(data=>{
        successNotification(`Email has been sent to ${data.accepted[0]}`)
        setSubmitted(false);
        history.push('/login')
      })
      .catch(err=>{
        let errMsg = err?.response?.data?.msg;
        failureNotification(errMsg)
        setSubmitted(false)
      })
      }
       
    }

   
    return (
        <div className="fPassword">
        <h2>Forgot Password</h2>
        <form className="fPasswordForm" method="post" onSubmit={forgotPassword}>
          <label>Email/Username</label>
          <input
            onChange={formChange}
            type="text"
            name="eoru"
            value = {eoru}
          />
          
          <button className={"fPasswordButton " + (submitted? "clicked":null) } onClick={submitted ?null:forgotPassword}>
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