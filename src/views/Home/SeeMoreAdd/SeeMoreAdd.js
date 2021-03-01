import React from 'react';
import { withRouter } from 'react-router-dom';
import './SeeMoreAdd.css'

function SeeMoreAdd(props){
    const goToShop = () =>{
        props.history.push('/shop');
    }
    return (
        <div className = 'seeMore'>
            <i className = 'fa fa-glass fa-4x'/>
            <h2>Browse All Products</h2>
            <button onClick = {goToShop}>See More</button>
        </div>
    )
}
export default withRouter(SeeMoreAdd)