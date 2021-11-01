import React from 'react'
import './AddChanllengePopup.css'

function AddChanllengePopup(props) {
    return (props.trigger)?(
        <div className = "popup">
            <div className = "popup-inner">
                <button classNmae = "close-btn" onClick={()=> props.setTrigger(false)}>close</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default AddChanllengePopup
