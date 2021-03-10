import React from 'react';
import './Ad.css'
import {adPicUrl} from '../../utilities/urls'
import AdDefault from '../../images/wineComp2.jpg'
export default function Ad({ad}){
    const {title, image} =ad;
    console.log(`${adPicUrl}/${image}`)
    const bgStyleFromBE = image? {
        backgroundImage: `url(${adPicUrl}/${image})`
    }
    : {
        backgroundImage: `url("${AdDefault}")`
    };
    return (
        <>
        <div className = 'ad'
        style = {bgStyleFromBE}
        >
            <h2>{title? title: null}</h2>
    
       </div>
       </>
    )
}