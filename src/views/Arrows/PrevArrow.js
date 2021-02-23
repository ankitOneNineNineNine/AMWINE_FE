import React from 'react';
import './Arrow.css'
export default function PrevArrow(props){
    const onclickfn = props.onClick
return(
    <div className = 'arrowLeft' onClick={onclickfn}>
        <i className = 'fa fa-chevron-left'></i>
    </div>
)
}