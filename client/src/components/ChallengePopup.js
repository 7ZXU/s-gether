import React, {Component} from 'react';
import InputText from './InputText';
import '../css/ChallengePopup.css';

function ChallengePopup(props)  {
    const {onClose} = props;
    return(
        <div className="popup">
            <div className="popup-inner">
                <div className = 'inputText'>
                    <InputText name="email" placeholder="ID..."  />
                    <InputText name="password" placeholder="PW..." type="password" />
                </div>
                <div className = 'close-btn'>
                
                    <button type="button" onClick={() => {
                            onClose(false);
                        }}
                    >close</button>
                </div>
            </div>
        </div>
    )
}

 
export default ChallengePopup;