import React from 'react';
import './AdminDisplay.css'


export default function AdminDisplay({admins, mainAdmin, deleteAdmin, user}){
    return (
        <div className = 'adminsDisplay'>
            <h3>All Admins</h3>
            <div className = 'label'>
                <span>Primary Admin</span>
                <div className = 'primaryAdmin'></div>
                <span>Secondary Admin</span>
                <div className = 'secondaryAdmin'></div>
            </div>
            <ul>
                {
                    admins.map((admin, i)=>{
               
                      return (     
                        <li className = {(admin.role === 'ADMIN_P')? "primaryAdmin": "secondaryAdmin"} key = {i}>
                        {admin.userName}
                       {
                          mainAdmin && (admin._id!==user._id)?
                           <div className = 'deleteAdmin'>
                           <i className = 'fa fa-trash' onClick = {() => deleteAdmin(admin._id)} />
                           </div>
                           :null
                       }
                         </li>
                      )
                    })
                }
             
            </ul>
        </div>
    )
}