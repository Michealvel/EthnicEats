import React, { useEffect, useRef } from 'react'
import reactDOM from 'react-dom'
import './style.css'

export default function Modal({ handle, children, times }) {

   const ref = useRef();
   const portal = document.getElementById('portal');
   let modal;

   if (!ref.current) {
      modal = document.createElement('div');
      modal.className = "modal";
      modal.id = "modal"
      ref.current = modal;
   }

   function handleModel(target) {
      const inner = document.getElementById('inner');
      const outer = document.getElementById('modal');
      if ((target === outer && target !== inner) || target === times) handle();
   }

   useEffect(() => {
      portal.appendChild(ref.current);
      //times)
      modal.addEventListener('click', (e) => { handleModel(e.target) });
      return () => {
         portal.removeChild(ref.current);
      }
      // eslint-disable-next-line
   }, [])

   return reactDOM.createPortal(<div id="inner">{children}</div>, ref.current);
}

