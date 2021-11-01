import React from 'react';
import "./Template.css";
import Challperson from "./Challperson";

import Cert from "./ChallengeCert";
import { useState } from "react";
import Todolist from "./TodoList";
import {MdCheckBox,MdCheckBoxOutlineBlank} from "react-icons/md";

const Template = ({children, Myname, days, Yourname, days2}) => {
    const [insertToggle, setInsertToggle] = useState(false);
    const onInsertToggle = () => {
        setInsertToggle(prev => !prev);
      };

      const [todos, setTodos] = useState([
        {
          id: 1,
          text: "할일 1",
          checked: true
        },
        {
          id: 2,
          text: "할일 2",
          checked: false
        },
        {
          id: 3,
          text: "할일 3",
          checked: true
        }
      ]);
      const [Cinfo, setCinfo] = useState({name: 'challenge', date: '2021-11-1 ~ 2021-11-30'});

      const [todocert, settodocert] = useState({id:'',isempty: ''});




    return (
        <div className='Template'>
            <div className='Router'> <div className='Router1'>내정보</div> <div className='Router2'>캘린더</div> <div className='Router3'>챌린지</div></div>
            <div className='ChallengeName'><img className='Challimg'  src={ require('.\\assets\\1.jpg') } />{Cinfo.name}<div>{Cinfo.date}</div></div>
            <div className= "Template1">
                <div className='Myname'><div className='Name' onClick={onInsertToggle}> Me: {Myname}
                    {insertToggle && <Challperson onInsertToggle={onInsertToggle}/>}
                    </div>
                <div className='Challenge-days'>
                    {days.map(day => ( 
                    <div className="ChallengeDays" key = {day.id} cert = {day.cert} onClick={() => settodocert({id: day.id,isempty: day.cert})}>
                        
                    <div className={'content ${checked ? "checked" : ""}'}>
                    {day.state && day.done && day.checked && <MdCheckBoxOutlineBlank size="30" color="green" />  }
                    {!day.state && <MdCheckBoxOutlineBlank size="30" color="gray" />}
                    {day.state && !day.checked && <MdCheckBoxOutlineBlank size="30" color="yellow" />}
                    {day.state && day.checked &&! day.done && <MdCheckBoxOutlineBlank size="30" color="red" />}
                    </div>
                    </div>
                    ))}
                </div>
                </div>

                <div className='Myname'><div className='Name' onClick={onInsertToggle}> Mate: {Yourname}
                    {insertToggle && <Challperson onInsertToggle={onInsertToggle}/>}
                    </div>

                <div className='Challenge-days'>
                    {days2.map(day => (
                    <div className="ChallengeDays" key = {day.id} cert = {day.cert} onClick={() => settodocert({id: day.id,isempty: day.cert})}>
                        
                    <div className={'content ${checked ? "checked" : ""}'}>
                    {day.state && day.done && day.checked && <MdCheckBoxOutlineBlank size="30" color="green" />  }
                    {!day.state && <MdCheckBoxOutlineBlank size="30" color="gray" />}
                    {day.state && !day.checked && <MdCheckBoxOutlineBlank size="30" color="yellow" />}
                    {day.state && day.checked &&! day.done && <MdCheckBoxOutlineBlank size="30" color="red" />}
                    </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>

            <div className= "Template2">
                <div className='title'>Todo list({todos.length})</div>
                <Todolist todos = {todos}/>
            </div>

            <div className= "Template3">
                <div className='title'>Certification</div>
                <Cert Cday={todos.length} cert={todocert.isempty}/>
            </div>
        </div>
    );
};

export default Template;

//{days.map(day => (<Days day = {day} key={day.id}  cert = {day.cert} />))}