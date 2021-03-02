import React from "react";

import "./AddAdmins.css";

export default function AddAdmins({ addAdmin, addAdminFormChange }) {
  return (
    <div className="addAdmins">
      <form className="addAdminForm" onSubmit={addAdmin}>
        <h2>Add Admin</h2>
        <label>Username</label>
        <input
          type="text"
          className="formInput"
          name="userName"
          onChange={addAdminFormChange}
        />
        <label>Fullname</label>
        <input
          type="text"
          className="formInput"
          name="fullName"
          onChange={addAdminFormChange}
        />
        <label>Role</label>
        <select name = "role" onChange = {addAdminFormChange} defaultValue = "ADMIN_S">
          <option value="ADMIN_P" >ADMIN_P</option>
          <option value="ADMIN_S">ADMIN_S</option>
        </select>
        <label>Email</label>
        <input
          type="text"
          className="formInput"
          name="email"
          onChange={addAdminFormChange}
        />
        <label>Password</label>
        <input
          type="password"
          className="formInput"
          name="password"
          onChange={addAdminFormChange}
        />
        <button className="addAdminFormButton">Add</button>
      </form>
    </div>
  );
}
