import React from 'react';
import './Arrow.css'
export default function NextArrow(props){
    const onclickfn = props.onClick
return(
    <div className = 'arrowRight' onClick = {onclickfn}>
        <i className = 'fa fa-chevron-right'></i>
    </div>
)
}