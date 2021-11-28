import ReactDom, { createPortal } from 'react-dom';
import '../css/AddChanllengePopup.css';

// function AddChanllengePopup(props) {
//     return createPortal(
//         <div className = "popup">
//             <div className = "popup-inner">
//                 <button classNmae = "close-btn" onClick={()=> props.setTrigger(false)}>close</button>
//                 {props.children}
//             </div>
//         </div>,
//         document.getElementById("AddChallengePopup")
//     );
// }

// export default AddChanllengePopup
function AddChallengePopup(props) {
    const { message } = props;
    return (
        
        <div className = "popup">
            <div className = "popup-inner">
                <button classNmae = "close-btn" onClick={()=> props.setTrigger(false)}>close</button>
                {props.children}
            </div>
        </div>
       
    );
  }
  
  export default AddChallengePopup;
