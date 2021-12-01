const express = require('express');
const app = express();
const db = require('./config/db');
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');


// const {
//   default: roundToNearestMinutesWithOptions,
// } = require('date-fns/fp/roundToNearestMinutesWithOptions/index');

const YOUR_SECRET_KEY = 'abcd';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.set('port', process.env.PORT || port);

app.post('/Register', (req, res) => {
  const usrId = req.body.usrId;
  const usrPw = req.body.usrPassword;
  const hashedusrPw = bcrypt.hashSync(usrPw, 10);
  db.query(
    `INSERT INTO management.user (id, password) VALUES ("${usrId}", "${hashedusrPw}")`
  );
});

app.post('/api/feed', (req, res) => {
  const token = req.body.token;
  let nickname;

  const id = jwt.decode(token, YOUR_SECRET_KEY);
  //console.log("디코드", jwt.decode(token, YOUR_SECRET_KEY));
  
  const sql = `SELECT nickname FROM management.user_info WHERE user_id = '${id.userId}'`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      nickname = row[0].nickname;
    }
    res.status(201).json({
      result: 'ok',
      id: nickname,
    });

  });

});

app.post('/api/todo', (req, res) => {
  const todo = req.body.todo;
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);
  console.log(todo, token);

  db.query(

    `INSERT INTO management.plan (plan_date, plan_todo, plan_check, user_id) VALUES (NOW(), "${todo}", "false", "${id.userId}") `

  )
})

app.post('/api/todo', (req, res) => {
  let todo = req
  console.log(todo);
});

app.post('/api/login', (req, res) => {
  let isUser = false;

  const userId = req.body.inputId;
  const userPassword = req.body.inputPw;
  const sql = 'SELECT user_id, password FROM management.user_info';
  db.query(sql, (err, rows, fields) => {
    if (err) {
      0;
      console.log(err);
    } else {
      rows.forEach((info) => {
        if (info.user_id === userId && info.password === userPassword) {
          isUser = true;
        } else {
          return;
        }
      });
      if (isUser) {
        const accessToken = jwt.sign(
          {
            userId,
          },
          YOUR_SECRET_KEY,
          {
            expiresIn: '1h',
          }
        );
        res.cookie('user', accessToken);
        res.status(201).json({
          result: 'ok',
          accessToken,
        });
      } else {
        res.status(400).json({ error: 'invalid user' });
      }
    }
  });
});

/* mypage의 Info 불러오기 */
app.post('/api/mypage/info', (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);
  const sql = `SELECT name, nickname, birth, email, phone_number FROM management.user_info WHERE user_id= '${id.userId}'`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: 'sql error' });
    } else {
      console.log(row[0]);
      const name = row[0].name;
      const nickname = row[0].nickname;
      const birth = row[0].birth;
      const email = row[0].email;
      const phone_number = row[0].phone_number;

      res.status(201).json({
        result: 'ok',
        name: name,
        nickname: nickname,
        birth: birth,
        email: email,
        phone_number: phone_number,
      });
    }
  });
});

/* mypage UserBlock에서 닉네임 불러오기 */
app.post('api/mypage/nickname', (req, res) => {
  const token = req.body.token;
  let nickname;

  const id = jwt.decode(token, YOUR_SECRET_KEY);
  const sql = `SELECT nickname FROM management.user_info WHERE user_id = '${id.userId}'`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      nickname = row[0].nickname;
    }
    res.status(201).json({
      result: 'ok',
      nickname: nickname,
    });
  });
});

/* mypage의 Charge 불러오기 */
app.post('/api/mypage/charge', (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  let history = [];
  let history_data = {};

  const sql = `SELECT transaction_date, money, current_balance FROM management.transaction_history WHERE user_id= '${id.userId}' AND transaction_type = 0 ORDER BY transaction_date`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: 'sql error' });
    } else {
      console.log(row);
      history = row;
      res.status(201).json({
        result: 'ok',
        history: row,
      });
    }
  });
});

/* challenge 세부정보 불러오기*/
app.post('/api/challenge_ing', (req, res) => {
  const token = req.body.token;
  const cid = req.body.challenge_id;

  let infos = [];
  let isdone;
  let isstate;
  let ischecked;
  let iscert;
  let date;

  const id = jwt.decode(token, YOUR_SECRET_KEY);
  const sql = `SELECT * FROM management.challenge_ing WHERE user_id = '${id.userId}' AND challenge_id = '${cid}'`;

  db.query(sql, (err, rows, fields) => {
    if (err) {
      //console.log(err);
      
      res.status(201).json({
        result: 'not ok',
      })

    } else {
      
      for ( let i = 0; i < rows.length; i++) 
            {
              /*if(오늘 날짜와 비교){
                isstate = true; 회색?
              }*/
              date = rows[i].challenge_date;
              isstate = true;
              if(rows[i].is_cert === 0){
                iscert = false;
              }
              else{
                iscert = true;
              }
              if(rows[i].mate_check === 0){ // mate 체크 안함
                ischecked = false;
                isdone = false;
              }
              else if(rows[i].mate_check === 1){ //mate 성공
                ischecked = true;
                isdone = true;
              }
              else{                           //mate 실패
                ischecked = true;
                isdone = false;
              }

              infos.push({ //{ id: 1, done: true, state: true, checked: true, cert: true }
                id: i,
                done: isdone,
                state: isstate,
                checked: ischecked,
                cert: iscert,
                date: date
              });
            };
            if(rows.length < 30){
              for(let i = rows.length + 1; i < 30; i++){
                infos.push({
                  id: i,
                  done: false,
                  state: false,
                  checked: false,
                  cert: false,
                  date: '2000-01-01'
                });
              }
            };
      res.status(201).json({
        result: 'ok',
        rows: infos
      });
    }
  });
});

/* (임시) challenge 이미지 날짜 불러오기*/
app.post('/api/challenge_info', (req, res) => {
  const token = req.body.token;
  const challenge_id = req.body.challenge_id;

  let challenge_image;
  let cname;
  let cstart;
  let cend;

  const sql = `SELECT * FROM management.challenge_info WHERE challenge_id = '${challenge_id}'`;//date_format(date_start, '%Y-%m-%d'), date_format(date_finish, '%Y-%m-%d'), challenge_image, challenge_name, challenge_id
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      /*console.log('-------------------------------------------------');
      console.log(substr(row[0].date_start,0,10));
      console.log('-------------------------------------------------');*/
      challenge_image = row[0].challenge_image;
      cstart = row[0].date_start;
      cend = row[0].date_finish;
      cname = row[0].challenge_name;
    }
    res.status(201).json({
      result: 'ok',
      image: challenge_image,
      start: cstart,
      end: cend,
      name: cname
    });
  });
});


/* challenge todo*/
app.post('/api/challenge_todo', (req, res) => {
  const token = req.body.token;
  const challenge_id = req.body.challenge_id;
  const user_id = req.body.user_id;

  let date;
  let todo;
  let check;
  let infos = [];

  const sql = `SELECT * FROM management.challenge_todo WHERE challenge_id = '${challenge_id}' AND user_id = '${user_id}'`;//date_format(date_start, '%Y-%m-%d'), date_format(date_finish, '%Y-%m-%d'), challenge_image, challenge_name, challenge_id
  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      for ( let i = 0; i < rows.length; i++) 
            {

              date = rows[i].challenge_date;
              todo = rows[i].challenge_todo;
              if(rows[i].todo_check === 1){ check = true;}
              else{check = false;}
              

              infos.push({
                id: i+1,
                text: todo,
                checked: check,
                date: date
              });
            };
    }
    res.status(201).json({
      result: 'ok',
      rows: infos
    });
  });
});

/* cert업로드 */
app.post('/api/certupload', (req, res) => {
  const challenge_id = req.body.challenge_id;
  const formdata = req.body.formdata;
  const config = req.body.config;
  const user_id = req.body.user_name;

const sql = `UPDATE management.challenge_ing SET is_cert = 0 `;
//const sql = `UPDATE management.challenge_ing SET challenge_image = '${formdata}' WHERE challenge_id = '${challenge_id}' AND user_id = '${user_id}'`;
db.query(sql, (err, rows, fields) => {
  if (err) {
    console.log("DB저장 실패");
    console.log(err);
  } else {
    console.log("DB저장 성공");
          };
});


});


app.listen(port, () => {
  console.log(`Connect at http://localhost:${port}`);
});
