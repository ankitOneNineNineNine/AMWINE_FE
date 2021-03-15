import React, { useState } from 'react';

import './AddressInput.css';

const defaultAddressForm = {
    address: null,
    city: null,
    state: null,
    postalCode: null,
    country: null
}

export default function AddressInput({setShowModal, setAddressFormDetails}){
    const [formDetails, setFormDetails] = useState({...defaultAddressForm})
    const [submitted, setSubmitted] = useState(false)
    const formChange = e =>{
        setFormDetails({...formDetails, [e.target.name]: e.target.value})
    }
    
    const submit = e =>{
        e.preventDefault();
        setAddressFormDetails({...formDetails});
        setShowModal(false)
    }
    return (
        <div className = 'address-container'>
            <span className = 'crossModal' onClick = {()=>setShowModal(false)}>&times;</span>
        <div className = 'address'>
             <h2>Address</h2>
      <form className="addressForm" method="post" onSubmit={submit}>
        <label>Address</label>
        <input
          onChange={formChange}
          type="text"
          name="address"
          defaultValue={formDetails.address}
        />
       <label>City</label>
        <input
          onChange={formChange}
          type="text"
          name="city"
          defaultValue={formDetails.city}
        />
        <label>State</label>
        <input
          onChange={formChange}
          type="text"
          name="state"
          defaultValue={formDetails.state}
        />
        <label>Postal Code</label>
        <input
          onChange={formChange}
          type="text"
          name="postalCode"
          defaultValue={formDetails.postalCode}
        />
        <label>Country</label>
        <input
          onChange={formChange}
          type="text"
          name="country"
          defaultValue={formDetails.country}
        />
        <button className="addressButton" onClick={submit} style = {submitted? {backgroundColor: 'gray'}: null} disabled = {submitted}>
          Done
        </button>
      </form>
        </div>
        </div>
    )
}