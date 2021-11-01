import React from 'react';
import { MdAddCircle } from 'react-icons/md';
import "./Challperson.css";
import Pchart from "./Pie.js";
import { useState } from "react";

const Challperson = (onInsertToggle, name) => {
  const [todos] = useState([
    {
      id: 1,
      date: "2021-10-01",
      challname: "Challenge: ",
      text: "한일 1",
      checked: true
    },
    {
      id: 2,
      date: "2021-10-02",
      challname: "Challenge: ",
      text: "한일 2",
      checked: false
    },
    {
      id: 3,
      date: "2021-10-02",
      challname: "Challenge: ",
      text: "한일 3",
      checked: true
    }
  ]);

    return(
    <div>
    <div className="Background" onClick={onInsertToggle}></div>
        <form>
          <div className= 'Na'>곽무진</div>
          <div className='Chart'>
            <Pchart/>
            <div className='Border'>
            <div className='Todo'>{todos.map(todo => <div className='Todos'>{todo.date}<div>{todo.challname} {todo.text}</div></div>)}</div>
            </div>
            </div>
        </form>
    </div>
    );
};

export default Challperson;