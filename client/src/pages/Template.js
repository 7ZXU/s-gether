import React, { useState } from 'react';
import '../css/Template.css';
import Challperson from '../components/Challperson';
import Cert from '../components/ChallengeCert';
import Todolist from '../components/TodoList';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import mainImg from '../assets/1.jpg';
import Header from '../components/Header';

//const Template = ({ children, Myname, days, Yourname, days2 }) => {
const Template = () => {
  const [insertToggle, setInsertToggle] = useState(false);
  const onInsertToggle = () => {
    setInsertToggle((prev) => !prev);
  };

  const [challenges] = useState([
    { id: 1, done: true, state: true, checked: true, cert: true },
    { id: 2, done: true, state: true, checked: true, cert: true },
    { id: 3, done: false, state: true, checked: true, cert: true },
    { id: 4, done: true, state: true, checked: true, cert: true },
    { id: 5, done: true, state: true, checked: true, cert: true },
    { id: 6, done: false, state: true, checked: true, cert: true },
    { id: 7, done: true, state: true, checked: true, cert: true },
    { id: 8, done: true, state: true, checked: true, cert: true },
    { id: 9, done: false, state: true, checked: false, cert: true },
    { id: 10, done: true, state: true, checked: true, cert: true },
    { id: 11, done: true, state: true, checked: true, cert: true },
    { id: 12, done: false, state: true, checked: true, cert: true },
    { id: 13, done: true, state: true, checked: true, cert: true },
    { id: 14, done: true, state: true, checked: true, cert: true },
    { id: 15, done: false, state: true, checked: true, cert: false },
    { id: 16, done: true, state: true, checked: false, cert: false },
    { id: 17, done: true, state: false, checked: false, cert: false },
    { id: 18, done: false, state: false, checked: false, cert: false },
    { id: 19, done: true, state: false, checked: true, cert: false },
    { id: 20, done: true, state: false, checked: false, cert: false },
    { id: 21, done: false, state: false, checked: false, cert: false },
    { id: 22, done: true, state: false, checked: true, cert: false },
    { id: 23, done: true, state: false, checked: false, cert: false },
    { id: 24, done: false, state: false, checked: false, cert: false },
    { id: 25, done: true, state: false, checked: true, cert: false },
    { id: 26, done: true, state: false, checked: false, cert: false },
    { id: 27, done: false, state: false, checked: false, cert: false },
    { id: 28, done: true, state: false, checked: true, cert: false },
    { id: 29, done: true, state: false, checked: false, cert: false },
    { id: 30, done: false, state: false, checked: false, cert: false },
  ]);

  const Myname = '곽무진';
  const days = challenges;
  const Yourname = '곽진무';
  const days2 = challenges;

  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '할일 1',
      checked: true,
    },
    {
      id: 2,
      text: '할일 2',
      checked: false,
    },
    {
      id: 3,
      text: '할일 3',
      checked: true,
    },
  ]);
  const [Cinfo, setCinfo] = useState({
    name: 'challenge',
    date: '2021-11-1 ~ 2021-11-30',
  });

  const [todocert, settodocert] = useState({ id: '', isempty: '' });

  return (
    <div className="Template">
      <div className="Router">
        {/* {' '}
        <div className="Router1">내정보</div>{' '}
        <div className="Router2">캘린더</div>{' '}
        <div className="Router3">챌린지</div> */}
        <Header />
      </div>
      <div className="ChallengeName">
        <img className="Challimg" src={mainImg} alt="챌린지 이미지" />
        {Cinfo.name}
        <div>{Cinfo.date}</div>
      </div>
      <div className="Template1">
        <div className="Myname">
          <div className="Name" onClick={onInsertToggle}>
            {' '}
            Me: {Myname}
            {insertToggle && <Challperson onInsertToggle={onInsertToggle} />}
          </div>
          <div className="Challenge-days">
            {days.map((day) => (
              <div
                className="ChallengeDays"
                key={day.id}
                cert={day.cert}
                onClick={() => settodocert({ id: day.id, isempty: day.cert })}
              >
                <div className={'content ${checked ? "checked" : ""}'}>
                  {day.state && day.done && day.checked && (
                    <MdCheckBoxOutlineBlank size="30" color="green" />
                  )}
                  {!day.state && (
                    <MdCheckBoxOutlineBlank size="30" color="gray" />
                  )}
                  {day.state && !day.checked && (
                    <MdCheckBoxOutlineBlank size="30" color="yellow" />
                  )}
                  {day.state && day.checked && !day.done && (
                    <MdCheckBoxOutlineBlank size="30" color="red" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="Myname">
          <div className="Name" onClick={onInsertToggle}>
            {' '}
            Mate: {Yourname}
            {insertToggle && <Challperson onInsertToggle={onInsertToggle} />}
          </div>

          <div className="Challenge-days">
            {days2.map((day) => (
              <div
                className="ChallengeDays"
                key={day.id}
                cert={day.cert}
                onClick={() => settodocert({ id: day.id, isempty: day.cert })}
              >
                <div className={'content ${checked ? "checked" : ""}'}>
                  {day.state && day.done && day.checked && (
                    <MdCheckBoxOutlineBlank size="30" color="green" />
                  )}
                  {!day.state && (
                    <MdCheckBoxOutlineBlank size="30" color="gray" />
                  )}
                  {day.state && !day.checked && (
                    <MdCheckBoxOutlineBlank size="30" color="yellow" />
                  )}
                  {day.state && day.checked && !day.done && (
                    <MdCheckBoxOutlineBlank size="30" color="red" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="Template2">
        <div className="title">Todo list({todos.length})</div>
        <Todolist todos={todos} />
      </div>

      <div className="Template3">
        <div className="title">Certification</div>
        <Cert Cday={todos.length} cert={todocert.isempty} />
      </div>
    </div>
  );
};

export default Template;

//{days.map(day => (<Days day = {day} key={day.id}  cert = {day.cert} />))}
