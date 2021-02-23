import React from 'react';
import './Contact.css'
import esewa from '../../../images/esewa.png'
import visa from '../../../images/visa.png'
import khalti from '../../../images/khalti.png'

export default function Contact(){
    return (
        <div className = 'contactContainer'>
        <div className = 'pymtInfo'>
            <h2>Payment Options</h2>
                <img src = {esewa} width = '200px'/>
                <img src = {khalti} width = '200px'/>
                <img src = {visa} width = '200px'/>
        </div>
        <div className = 'cntctInfo'>
        <h2>Contact Info</h2>
        <span className = 'sadd'>Bhaktapur, Nepal</span>
        <span className = 'tel'>Tel: +8787542464687</span>
        <span className = 'email'>Email: pra@gads.com</span>
        <div className = 'iconContainerSocial'>
        <i className = 'fa fa-facebook fa-3x'></i>
        <i className = 'fa fa-instagram fa-3x'></i>
        </div>
        </div>
        </div>
    )
}