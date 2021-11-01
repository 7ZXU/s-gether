import React from 'react';
import { MdAddCircle } from 'react-icons/md';
import '../css/Challperson.css';
import Pchart from './Pie.js';
import { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  margin-left: 10%;
  position: absolute;
  top: 20%;
  left: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 990;
  width: 1200px;
  height: 1000px;
  border-radius: 5px;
  box-shadow: 1px 2px 5px 1px black;

  background: white;
`;

const Challperson = (onInsertToggle, name) => {
  const [todos] = useState([
    {
      id: 1,
      date: '2021-10-01',
      challname: 'Challenge: ',
      text: '한일 1',
      checked: true,
    },
    {
      id: 2,
      date: '2021-10-02',
      challname: 'Challenge: ',
      text: '한일 2',
      checked: false,
    },
    {
      id: 3,
      date: '2021-10-02',
      challname: 'Challenge: ',
      text: '한일 3',
      checked: true,
    },
  ]);

  return (
    <div>
      <div className="Background" onClick={onInsertToggle}></div>
      <Form>
        <div className="Na">곽무진</div>
        <div className="Chart">
          <Pchart />
          <div className="Border">
            <div className="Todo">
              {todos.map((todo) => (
                <div className="Todos">
                  {todo.date}
                  <div>
                    {todo.challname} {todo.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Challperson;
