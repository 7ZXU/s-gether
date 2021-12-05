import React, { useState, useEffect } from 'react';
import '../css/Template.css';
import Challperson from '../components/Challperson';
import Cert from '../components/ChallengeCert';
import Todolist from '../components/TodoList';
import Ctodo from '../components/Challengeaddtodo';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdAddCircle,
} from 'react-icons/md';
import mainImg from '../assets/1.jpg';
import Header from '../components/Header';
import { getCookie } from '../cookie';
import axios from 'axios';
import { get } from 'http';
//import ImagePicker from 'antd-mobile/lib/image-picker';
//import imageCompression from "browser-image-compression";
//const Template = ({ children, Myname, days, Yourname, days2 }) => {
const Template = ({ match }) => {
  let time = new Date();
  let year = time.getFullYear;
  let day = time.getDay;
  let month = time.getMonth;

  console.log('현재 선택한 챌린지');
  console.log(match.params);
  const challengeId = Number(match.params.index.substring(1));

  const [insertToggle, setInsertToggle] = useState(false);
  const onInsertToggle = () => {
    setInsertToggle((prev) => !prev);
  };

  const [insertToggle2, setInsertToggle2] = useState(false);
  const onInsertToggle2 = () => {
    setInsertToggle2((prev) => !prev);
  };

  const token = getCookie('myToken');

  const [cimg, setcimg] = useState('');
  const [user, setUser] = useState('');

  const [challenges, setchallenges] = useState([
    {
      id: 1,
      done: true,
      state: false,
      checked: true,
      cert: true,
      date: '2021-11-30',
    },
  ]);

  const [Cinfo, setCinfo] = useState({
    name: 'challenge',
    date: '2021-11-1 ~ 2021-11-30',
  });

  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '할일 1',
      checked: true,
      date: '2020-11-30',
    },
  ]);

  const [temptodos, settempTodos] = useState([]);

  const daytodos = () => {
    settempTodos([]);
    alltodos.map(
      (all) => (all.date === getday.date ? temptodos.push(all) : '') //2021-11-29T15:00:00.000Z => e.target.date
    );
    setTodos(temptodos);
  };

  const matedaytodos = () => {
    setmatetempTodos([]);
    matealltodos.map(
      (all) => (all.date === getday.date ? matetemptodos.push(all) : '') //2021-11-29T15:00:00.000Z => e.target.date
    );
    setmateTodos(matetemptodos);
  };

  const [alltodos, setallTodos] = useState([
    {
      id: 1,
      text: '할일 1',
      checked: true,
      date: '2021-11-30',
    },
  ]);

  const [itemData, setitemdata] = useState([
    {
      id: 1,
      img: '',
      ischecked: 0,
      date: '2020-12-12',
    },
  ]);
  const [allitemData, setallitemdata] = useState([
    {
      id: 1,
      img: '',
      ischecked: 0,
      date: '2020-12-12',
    },
    {
      id: 2,
      img: '',
      ischecked: 0,
      date: '2020-12-12',
    },
  ]);
  const [mateid, setmateid] = useState('');
  const [mateuser, setmateUser] = useState('');

  const [matechallenges, setmatechallenges] = useState([
    {
      id: 1,
      done: true,
      state: false,
      checked: true,
      cert: true,
      date: '2021-11-30',
    },
  ]);

  const [matetodos, setmateTodos] = useState([
    {
      id: 1,
      text: '할일 1',
      checked: true,
      date: '2020-11-30',
    },
  ]);

  const [matetemptodos, setmatetempTodos] = useState([]);

  const [mateitemData, setmateitemdata] = useState([
    {
      id: 1,
      img: '',
      ischecked: 0,
      date: '2020-12-12',
    },
  ]);
  const [mateallitemData, setmateallitemdata] = useState([
    {
      id: 1,
      img: '',
      ischecked: 0,
      date: '2020-12-12',
    },
    {
      id: 2,
      img: '',
      ischecked: 0,
      date: '2020-12-12',
    },
  ]);

  const [matealltodos, setmateallTodos] = useState([
    {
      id: 1,
      text: '할일 1',
      checked: true,
      date: '2021-11-30',
    },
  ]);

  const [mate, setmate] = useState('');


  const [update, setupdate] = useState(false);
  const onupdate = () => {
    setupdate((prev) => !prev);
  };


  const onupdate2 = () => {
    async function loadData() {
      await axios
        .post('http://localhost:5000/api/challenge_ing', {
          token: token,
          challenge_id: challengeId, //실험용
          today: time
        })
        .then((res) => {
          if(res.data.result === 'not ok'){
            console.log("no progress");
          }
          else{
            setchallenges(
                res.data.rows,
                );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function loadData2() {
      await axios
        .post('http://localhost:5000/api/challenge_info', {
          token: token,
          challenge_id: challengeId //실험용
        })
        .then((res) => {
          //console.log("-------------challenge_image---------------");
          //console.log(res.data);
          setcimg(res.data.image);
          //console.log("-------------challenge_image---------------");
          setCinfo({
            name: res.data.name,
            date: res.data.start.substring(0,10) + ' ~ ' + res.data.end.substring(0,10)
          });

        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function loadData3() {
      await axios
        .post('http://localhost:5000/api/feed', {
          token: token,
        })
        .then((res) => {
          const nickname = res.data.nickname;
          setUser(nickname);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function loadData4() {
      await axios
        .post('http://localhost:5000/api/challenge_todo', {
          token: token,
          challenge_id: challengeId, //실험용----------------------------------------------------------------------------------------------------------------------
          user_id: 'snow' //실험용
        })
        .then((res) => {
          setallTodos(
            res.data.rows
            );
            console.log(res.data.rows);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function loadData5() {
      await axios
        .post('http://localhost:5000/api/challenge_ing_img', {
          token: token,
          challenge_id: challengeId, //실험용
        })
        .then((res) => {
          if(res.data.result === 'not ok'){
            console.log("no progress");
          }
          else{
            console.log(res.data.rows);
            setallitemdata(
              res.data.rows
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function loadData6() {
      await axios
        .post('http://localhost:5000/api/challenge_mate', {
          token: token,
          challenge_id: challengeId, //실험용
          today: time
        })
        .then((res) => {
          if(res.data.result === 'not ok'){
            console.log("no mate");
          }
          else{
            console.log(res.data);
            setmatechallenges(
              res.data.mcinfo,
              );
            const matenickname = res.data.matenick;
            setmateUser(matenickname);
            const matei = res.data.maid;
            setmateid(matei);
            setmateallTodos(
              res.data.mctodo
              );
            setmateallitemdata(
              res.data.mcimg
            );
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    loadData();
    loadData4();
    loadData5();
    loadData6();
    setupdate((prev) => !prev);
  };

  if(update === true){
    onupdate2();
  }

  useEffect(() => {
    async function loadData() {
      await axios
        .post('http://localhost:5000/api/challenge_ing', {
          token: token,
          challenge_id: challengeId, //실험용
          today: time
        })
        .then((res) => {
          if (res.data.result === 'not ok') {
            console.log('no progress');
          } else {
            setchallenges(res.data.rows);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function loadData2() {
      await axios
        .post('http://localhost:5000/api/challenge_info', {
          token: token,
          challenge_id: challengeId, //실험용
        })
        .then((res) => {
          //console.log("-------------challenge_image---------------");
          //console.log(res.data);
          setcimg(res.data.image);
          //console.log("-------------challenge_image---------------");
          setCinfo({
            name: res.data.name,
            date:
              res.data.start.substring(0, 10) +
              ' ~ ' +
              res.data.end.substring(0, 10),
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function loadData3() {
      await axios
        .post('http://localhost:5000/api/feed', {
          token: token,
        })
        .then((res) => {
          const nickname = res.data.nickname;
          setUser(nickname);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function loadData4() {
      await axios
        .post('http://localhost:5000/api/challenge_todo', {
          token: token,
          challenge_id: challengeId, //실험용
          user_id: 'snow', //실험용
        })
        .then((res) => {
          setallTodos(res.data.rows);
          console.log(res.data.rows);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function loadData5() {
      await axios
        .post('http://localhost:5000/api/challenge_ing_img', {
          token: token,
          challenge_id: challengeId, //실험용
        })
        .then((res) => {
          if (res.data.result === 'not ok') {
            console.log('no progress');
          } else {
            console.log(res.data.rows);
            setallitemdata(
              res.data.rows
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function loadData6() {
      await axios
        .post('http://localhost:5000/api/challenge_mate', {
          token: token,
          challenge_id: challengeId, //실험용
          today: time
        })
        .then((res) => {
          if (res.data.result === 'not ok') {
            console.log('no mate');
          } else {
            console.log(res.data);
            setmatechallenges(res.data.mcinfo);
            const matenickname = res.data.matenick;
            setmateUser(matenickname);
            setmateallTodos(res.data.mctodo);
            setmateallitemdata(res.data.mcimg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    loadData5();

    loadData();
    loadData2();
    loadData3();
    loadData4();
    loadData6();
  },[]);
  

  const daycheck = () => {
    setitemdata(allitemData);
    };
    const matedaycheck = () => {
      setitemdata(mateallitemData);
      };
    //--------------------------------------------------------------------

  const Myname = user;
  const days = challenges;
  const Yourname = mateuser; //mate들어올 곳
  const days2 = matechallenges;

  const [todocert, settodocert] = useState({ id: '', isempty: '' });
  const [getday, setgetday] = useState({ date: '' });

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
        <img className="Challimg" src={cimg} alt="챌린지 이미지" />
        {Cinfo.name}
        <div>{Cinfo.date}</div>
      </div>
      <div className="Template1">
        <div className="Myname">
          <div className="Name" onClick={onInsertToggle}>
            {' '}
            Me: {Myname}
            {insertToggle && <Challperson onInsertToggle={onInsertToggle} challengeId={challengeId}/>}
          </div>
          <div className="Challenge-days">
            {days.map((day) => (
              <div
                className="ChallengeDays"
                key={day.id}
                cert={day.cert}
                date={day.date}
                day={day}
                onClick={() => settodocert({ id: day.id, isempty: day.cert })}
                onMouseDown={() => setgetday({ date: day.date })}
                onMouseUp={daytodos}
                onMouseOver={daycheck}
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
            {insertToggle && <Challperson onInsertToggle={onInsertToggle} challengeId={challengeId} />}
          </div>

          <div className="Challenge-days">
            {days2.map((day) => (
              <div
                className="ChallengeDays"
                key={day.id}
                cert={day.cert}
                onClick={() => settodocert({ id: day.id, isempty: day.cert })}
                date={day.date}
                day={day}
                onMouseDown={() => setgetday({ date: day.date })}
                onMouseUp={matedaytodos}
                onMouseOver={matedaycheck}
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

      {!(getday.date === "") &&<div className="Template2">
        <div className="title">{getday.date.substring(0,10)} Todo list({todos && todos.length})</div>
        <Todolist todos={todos} />
        <button className="no" onClick={onInsertToggle2}><MdAddCircle size="100" color="black" /></button>
        <Ctodo open={insertToggle2} user={user} cid={challengeId} cday={getday.date} onInsertToggle2 = {onInsertToggle2}/>
      </div>}

      {!(getday.date === "") &&<div className="Template3">
        <div className="title">Certification</div>
        <Cert Cday={todos && todos.length} cert={1} sday={getday.date} t2 = {itemData} update={onupdate} challengeId={challengeId} mid={mateid}/>
      </div>}
    </div>
  );
};

export default Template;

//{days.map(day => (<Days day = {day} key={day.id}  cert = {day.cert} />))}
