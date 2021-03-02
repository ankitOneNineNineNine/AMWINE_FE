import React from 'react';
import './SalesAnalytics.css'


export default function SalesAnalytics(){
    return (
      
        <div className = 'salesAnalytics'>
            <div className = 'briefAnalytics'>
                <h2>Last Month Sales Numbers and Most Sold Product</h2>
            <div className = 'lastMonth'>
                <h3>Last Month</h3>
                <hr />
                <p>1105</p>
            </div>
            <div className = 'mostSold'>
                <h3>Most Sold</h3>
                <hr />
                <p>Red Chille Wine</p>
            </div>
            </div>
        </div>
     
    )
}