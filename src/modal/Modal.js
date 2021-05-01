import React from 'react'
import './modal.css'

const Modal = ({active, setActive, children}) => {
    return (
        <div className={active ? 'modal active':'modal'}>
            <div className='modalContent row' onClick={e=>e.stopPropagation()}>
                {children}
                <button className='closeModalButton btn btn-secondary closeModalButton' onClick={()=>setActive(false)}>Close</button>
            </div>
        </div>
    )
}

export default Modal;