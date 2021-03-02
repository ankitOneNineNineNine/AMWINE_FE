import React from 'react';

import './AddAdmins.css'

export default function AddAdmins(){
    return (
        <div className = 'addAdmins'>
        <h3>Add Admin</h3>

        <form className = 'addAdminForm'>
            <label>Username</label>
            <input type = 'text' className = 'formInput' name = 'userName' />
            <label>Fullname</label>
            <input type = 'text' className = 'formInput' name = 'userName' />
            <label>Role</label>
            <select>
                <option value = 'ADMIN_P'>ADMIN_P</option>
                <option value = 'ADMIN_S'>ADMIN_S</option>
            </select>
            <label>Email</label>
            <input type = 'text' className = 'formInput' name = 'userName' />
            <label>Password</label>
            <input type = 'text' className = 'formInput' name = 'userName' />
            <button>Add</button>
        </form>
    </div>
    )
}