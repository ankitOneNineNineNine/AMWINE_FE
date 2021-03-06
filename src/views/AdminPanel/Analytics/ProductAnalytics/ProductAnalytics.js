import React from 'react';
import { Link } from 'react-router-dom';

import './ProductAnalytics.css';


export default function ProductAnalytics({min, max, products, goToProduct,changePageNumber }){

return (
    <div className = 'productAnalytics'>
  
     <div className = 'productNav'>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Sold</th>
                        <th>Remaining</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product=>{
                            return (
                                <tr key = {product._id} onClick = {() => goToProduct(product._id)}>
                               
                                    <td>{product.name}</td>
                                    <td>{product.sold|| 0}</td>
                                    <td>{(product.quantity - (product.sold|| 0))}</td>
                               
                                </tr>
                            )
                        })
                    }
                
                    </tbody>
            </table>

            <div className = "analyticsPaginate">
            <button style = {min? {backgroundColor: 'gray'}: null}  onClick = {() => changePageNumber('prev')}>Prev</button>
            <button style = {max? {backgroundColor: 'gray'}: null}  onClick = {() => changePageNumber('next')}>Next</button>
            </div>
     </div>
    </div>
)
}