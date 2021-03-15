import React from 'react'
import { useEffect } from "react";
import ReactDOM from 'react-dom'
const appRoot = document.querySelector('#root');
const modalRoot = document.querySelector('#modal');

export default function Modal(props){
    const el = document.createElement('div');
    useEffect(()=>{
        modalRoot.appendChild(el);
        return ()=>{
            modalRoot.removeChild(el)
        }
    }, []);

    
    return ReactDOM.createPortal(
      props.children,
    el
    )
}
  
