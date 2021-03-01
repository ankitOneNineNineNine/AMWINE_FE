import React from 'react';
import './Ad.css'
import {adPicUrl} from '../../utilities/urls'

export default function Ad({ad}){
    const {title, image} =ad;
    console.log(`${adPicUrl}/${image}`)
    const bgStyleFromBE = image? {
        backgroundImage: `url(${adPicUrl}/${image})`
    }
    : {
        backgroundImage: "url(../../images/wine.png"
    };

    console.log(bgStyleFromBE)
    return (
        <>
        <h2>{title}</h2>
        <div className = 'ad'
        style = {bgStyleFromBE}
        >
    
       </div>
       </>
    )
}