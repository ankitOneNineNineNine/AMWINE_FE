import React from 'react';
import { NavLink } from 'react-router-dom';

import './NotFound.css';

export default function NotFound({history}){
    
    const goBack = _ =>{
        history.goBack();
    }
    return (
        <div className = 'notF'>
        <div className = 'topIcons'>
        <i className = 'goBack fa fa-arrow-left' onclick = {goBack} />
        <NavLink to = '/AMWINE_FE' className = 'goHome'>Go to Home</NavLink>
        </div>
        <div className = 'notFoundIcon'>
           
        </div>
        </div>
    )
}