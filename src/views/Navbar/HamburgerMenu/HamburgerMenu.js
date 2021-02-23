import React from 'react';
import './HamburgerMenu.css'

export default function HamburgerMenu({showMenu,openOrClose}){
    return (
        <div className = 'hamMenu'>
                {showMenu? 
                <i className = 'fa fa-times fa-2x' onClick = {openOrClose}></i>
                     : 
                <i className = 'fa fa-bars fa-2x' onClick = {openOrClose}></i>}
            </div>
    )
}