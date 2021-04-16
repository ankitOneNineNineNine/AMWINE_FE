import React from 'react';
import { NavLink } from 'react-router-dom';

import './NotFound.css';

export default function NotFound({history}){
    
    const goBack = _ =>{
        history.goBack();
    }
    return (
        <>
        <i className = 'goBack fa fa-arrow-left' onclick = {goBack} />
        <NavLink to = '/AMWINE_FE' className = 'goHome'>Go to Home</NavLink>
        <div className = 'notFoundIcon'>
           
        </div>
        </>
    )
}