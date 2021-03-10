import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Admins.css'

import {isMainAdmin} from '../../../utilities/auth.middleware'
import AddAdmins from '../../../views/AdminPanel/AddAdmins/AddAdmins';

import {get, post, remove} from '../../../utilities/http';
import {successNotification} from '../../../utilities/toast'
import AdminDisplay from '../../../views/AdminPanel/AdminDisplay/AdminDisplay';

const mapStateToProps = state =>{
    return {
        user: state.user.user,
    }
}
const newAdminFormDetails = {
    userName: null,
    fullName: null,
    password: null,
    role: "ADMIN_S"
}
function Admins({user}){
    const [formDetails, setFormDetails] = useState({...newAdminFormDetails})
    const [allAdmins, setAllAdmins] =useState([]);
    useEffect(()=>{
        get('/adminAuth', {} ,true)
        .then(admins=>{
            setAllAdmins(admins)
        })
        .catch(console.log)
    }, []);

    const deleteAdmin = id =>{
        
        remove(`/adminAuth/${id}`, {}, true)
        .then(_=>{
            let newA = allAdmins;
            newA.splice(newA.findIndex(p=>p._id === id), 1)
            setAllAdmins(newA)
        })
        .catch(console.log)
    }
    const addAdminFormChange = e =>{
        let {name, value} = e.target;
        setFormDetails({...formDetails, [name]: value})
    }
    const addAdmin = e =>{
        e.preventDefault();
        post('adminAuth', {body:formDetails}, true)
        .then(admin=>{
            successNotification('Auccessfully added');
            setFormDetails({...newAdminFormDetails})
            setAllAdmins([...allAdmins, {
                _id: admin._id,
                image: admin._image,
                fullName: admin.fullName,
                role : admin.role,
                userName: admin.userName
            }]);
        })
        .catch(err=>console.log(err))
    }
    return (
       <>
        <AdminDisplay admins = {allAdmins} mainAdmin = {isMainAdmin(user)} deleteAdmin = {deleteAdmin} user = {user}/>
      {isMainAdmin(user)?
        <AddAdmins  addAdmin = {addAdmin} addAdminFormChange  = {addAdminFormChange}/>
        :null  
    }
       </>
    )
}

export default connect(mapStateToProps)(Admins);