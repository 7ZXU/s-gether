import React from 'react';
import { MdAddCircle } from 'react-icons/md';
import '../css/Challperson.css';
import Pchart from './Pie.js';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCookie } from '../cookie';
import axios from 'axios';

const Form = styled.form`
  margin-left: 10%;
  position: absolute;
  top: 10%;
  left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 990;
  width: 1000px;
  height: 800px;
  border-radius: 5px;
  box-shadow: 1px 2px 5px 1px black;

  background: white;
`;

const Challperson = ({onInsertToggle, name, challengeId}) => {
  const [todos] = useState([
    {
      id: 1,
      date: '2021-12-08',
      challname: 'Challenge: ',
      text: 'react Study',
      checked: true,
    },
    {
      id: 2,
      date: '2021-12-07',
      challname: 'Challenge: ',
      text: 'react Study',
      checked: false,
    },
    {
      id: 3,
      date: '2021-12-06',
      challname: 'Challenge: ',
      text: 'react Study',
      checked: true,
    },
  ]);

  const [cimg, setcimg] = useState('');

  const [challenges, setchallenges] = useState('');

  const [Cinfo, setCinfo] = useState({
    name: 'challenge',
    date_start: '2021-11-1',
    date_end: '2021-11-30'
  });

  const [user, setUser] = useState('');
  const [dnum, setdnum] = useState(0);


  const token = getCookie('myToken');

  let time = new Date();
  let year = time.getFullYear;
  let day = time.getDay;
  let month = time.getMonth;
  
  useEffect(() => {
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
            let tnum = 0;
            res.data.rows.map((all) =>
            all.done === true
              ? tnum++
              : ''
            )
            console.log(tnum);
            setdnum(tnum);
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
            date_start: res.data.start.substring(0,10),
            date_end: res.data.end.substring(0,10)
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
          const nickname = res.data.id;
          setUser(nickname);
        })
        .catch((err) => {
          console.log(err);
        });
    }


    loadData();
    loadData2();
    loadData3();
  },[]);  

  return (
    <div>
      <div className="Background" id="Bac" onClick={() =>onInsertToggle}></div>
      <Form>
        <div className="Na"></div>
        <div className="Chart">
          <Pchart start= {Cinfo.date_start} end= {Cinfo.date_end} done= {dnum} />
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
