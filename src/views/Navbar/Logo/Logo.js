import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css'


export default function Logo(){
    return(
        <div className = 'linkContainer'>
        <Link to = '/AMWINE_FE'>
        <div className = 'logo'>
        <div className ='box'></div>
        <span>AMWINE</span>
        </div>
        </Link>
        </div>
    )
}