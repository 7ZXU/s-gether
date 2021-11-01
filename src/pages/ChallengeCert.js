import React from 'react';
import "./ChallengeCert.css";
import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import ChallengeBack from "./ChallengeBack";
import Certcheck from "./Certcheck";
import { ImageList } from '@mui/material';
import {ImageListItem} from '@mui/material';

const Cert = ({Cday,cert}) => {
    const [insertToggle, setInsertToggle] = useState(false);
    const [insertToggle2, setInsertToggle2] = useState(false);
    const [itemData,setitemdata] = useState([
      {
        id:1,
        img: require('.\\assets\\1.jpg'),
        ischecked:false,
        isgood: false
      },
      {
        id:2,
        img: require('.\\assets\\2.jpg'),
        ischecked:false,
        isgood: false
      },
      {
        id:3,
        img: require('.\\assets\\3.jpg'),
        ischecked:false,
        isgood: false
      },
      {
        id:4,
        img: require('.\\assets\\4.jpg'),
        ischecked:false,
        isgood: false
      }
    ]);
    const onInsertToggle = () => {
        setInsertToggle(prev => !prev);
      };
    const onInsertToggle2 = () => {
        setInsertToggle2(prev => !prev);
      };
      const [cimg,imgchange] = useState( require('.\\assets\\2.jpg'))
      const onInsertImage = (inp) => {
        imgchange(inp.target.src);
      };
      const [imgid,setimgid] = useState(1);

      const onimgsetting = () => {
        setitemdata( itemData.map(item =>item.id === imgid ? { ...item, ischecked: true, isgood: true }: { ...item, ischecked: true,isgood: true } ));
      };


    return <div className='ChallengeCerts'>
        {!cert && <div className="add-button" onClick={onInsertToggle}><MdAddCircle/></div>}
        {cert && 
        <ImageList sx={{ width: 700, height: 200 }} cols={3} rowHeight={164}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img className='certimage'
              src={ item.img}
              srcSet={item.img}
              onMouseOver ={ onInsertImage}
              onMouseDown = {()=>setimgid(item.id)}
              onClick={ onInsertToggle2}
            /><div className='indicater'>{!item.ischecked &&<MdAddCircle size='45' color='yellow'/>}{item.ischecked && item.isgood&& <MdAddCircle size='45' color='green'/>}{item.ischecked && !item.isgood && <MdAddCircle size='45' color='red'/>}</div>
          </ImageListItem>
        ))}
        <div className="add-button2" onClick={onInsertToggle}><MdAddCircle/></div>
      </ImageList>}
    {insertToggle && <ChallengeBack onInsertToggle={onInsertToggle}/>}
    {insertToggle2 && <div>
    <div className="Check" onClick={onInsertToggle2}></div>
        <form>
            <img className='image' src={cimg} />
            <div className='font'>확인 </div>
            <button className="yes" onClick={onInsertToggle2} onMouseOver={() => setitemdata( itemData.map((item) =>item.id === imgid ? { ...item, ischecked: true,isgood: true }: item ))}><MdAddCircle size="100" color="green"/></button>
            <button className="no" onClick={onInsertToggle2} onMouseOver={() => setitemdata( itemData.map((item) =>item.id === imgid ? { ...item, ischecked: true,isgood: false }: item ))}><MdAddCircle size="100" color="red"/></button>
        </form>
    </div>
    }
    </div>;
}


export default Cert;
