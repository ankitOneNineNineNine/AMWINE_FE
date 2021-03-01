import React from 'react';
import './Admins.css'

export default function Admins(){
    return (
       <>
        <div className = 'adminsDisplay'>
            <h3>All Admins</h3>
            <div className = 'label'>
                <span>Primary Admin</span>
                <div className = 'primaryAdmin'></div>
                <span>Secondary Admin</span>
                <div className = 'secondaryAdmin'></div>
            </div>
            <ul>
                <li className = 'primaryAdmin'>
                    Ankit Pradhan
                </li>
                <li className = 'secondaryAdmin'>
                    Kiran Musyakhwo
                </li>
                <li>
                    
                </li>
            </ul>
        </div>
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
       </>
    )
}