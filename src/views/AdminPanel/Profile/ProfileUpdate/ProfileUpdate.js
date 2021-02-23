import React, { useRef, useState } from 'react';
import './ProfileUpdate.css';
import Wine from '../../../../images/wine.png'

const updateFormDetails = {
    fullName: "",
    address: "",
    number: "",
    image: ""
}

export default function ProfileUpdate(){
    const imageChange = useRef(null)
    const [formDetails, setFormDetails] = useState({...updateFormDetails});


const detailsChange = (e) =>{
    let {name, value, type} = e.target;
    if(type === 'file'){
        value = e.target.files[0];
    }
    setFormDetails({...formDetails, [name]:value})
}
const submit = (e) =>{
    e.preventDefault();

    console.log(formDetails)
}
const imageSelect = (e) =>{
    e.preventDefault();

    if(!formDetails.image){
        imageChange.current.click();
    }
    else{
        setFormDetails({...formDetails, image: ""})
    }
}
console.log()
return(
    <div className = ''>
     <form method = 'put' onSubmit = {submit}>
    <div className = 'profileUpdator'>
        <div className = 'pImageContainer'>
            <img className = 'pImage' src = {formDetails.image? URL.createObjectURL(formDetails.image): Wine} />
            
        <i className ={`uploaderIcon fa ${formDetails.image? 'fa-arrow-left': 'fa-camera'}`}  onClick = {imageSelect} />
        </div>
        <hr />
        <div className = 'pUpdateContainer'>
       
         <input type = 'file' ref = {imageChange} name = 'image' onChange = {detailsChange} className = 'imageSelector'></input>
         <label>FullName</label>
            <h2><input type = 'text' className = 'editor' onChange = {detailsChange} name = 'fullName' placeholder = 'FullName' defaultValue = {formDetails.fullName}/></h2>
            <label>Username</label>
            <p>UserName (Uneditable)</p>
            <label>Email</label>
            <p>email (Uneditable)</p>
            <label>Address</label>
            <p><input type = 'text' className = 'editor' onChange = {detailsChange} name = 'address' placeholder = 'Address' defaultValue = {formDetails.address}/></p>
            <label>Number</label>
            <p><input type = 'tel' className = 'editor' onChange = {detailsChange} name = 'number' placeholder = 'Ph. Number' defaultValue = {formDetails.number}/></p>
        </div>
    <button className = 'updateProfileButton' onClick = {submit}>Update</button>
    </div>
    </form>
    </div>
)
}