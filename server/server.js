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
  // 복호화하는 부분에 대해 아직 해결 못했으므로 일단 그냥 pw 저장
  // const hashedusrPw = bcrypt.hashSync(usrPw, 10);
  db.query(
    `INSERT INTO management.user_info (user_id, password) VALUES ("${usrId}", "${usrPw}")`
  );
});

app.post('/api/feed', (req, res) => {
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
      id: id.userId,
    });
  });
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

      console.log(phone_number);

      res.status(201).json({
        result: 'ok',
        name: name,
        nickname: nickname,
        birth: birth,
        email: email,
        phone: phone_number,
      });
    }
  });
});

/* Info 저장하기 */
app.post('/api/mypage/saveInfo', (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  const name = req.body.name ? "'" + req.body.name + "'" : null;
  const birth = req.body.birth ? "'" + req.body.birth + "'" : null;
  const phone = req.body.phone ? "'" + req.body.phone + "'" : null;
  const email = req.body.email ? "'" + req.body.email + "'" : null;

  const sql = `UPDATE management.user_info SET name = ${name}, birth = ${birth}, email = ${email}, phone_number = ${phone} WHERE user_id= '${id.userId}'`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: 'sql error' });
    } else {
      res.status(201).json({
        result: 'ok',
      });
    }
  });
});

/* mypage UserBlock에서 닉네임 불러오기 */
app.post('/api/mypage/nickname', (req, res) => {
  const token = req.body.token;
  let nickname;

  const id = jwt.decode(token, YOUR_SECRET_KEY);
  const sql = `SELECT nickname FROM management.user_info WHERE user_id = '${id.userId}'`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      nickname = row[0].nickname;
      console.log(nickname);
      res.status(201).json({
        result: 'ok',
        nickname: nickname,
        id: id.userId,
      });
    }
  });
});

/* mypage의 Charge 불러오기 */
// todo: 스터디 참여(type = 2)할 경우 잔액에서 - 해줘야 함.
app.post('/api/mypage/charge', (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  const sql = `SELECT transaction_date, money, current_balance FROM management.transaction_history WHERE user_id= '${id.userId}' AND transaction_type = 0 ORDER BY transaction_date`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: 'sql error' });
    } else {
      console.log(row);
      // history = row;
      res.status(201).json({
        result: 'ok',
        history: row,
      });
    }
  });
});

/* penalty와 reward 불러오기 */
// penalty
app.post('/api/mypage/penalty', (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  const sql = `SELECT transaction_date, money FROM management.transaction_history WHERE user_id='${id.userId}' AND transaction_type = 3 ORDER BY transaction_date`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: 'sql error' });
    } else {
      console.log('penalty: ' + row);
      // const penalty = row; // penalty 내역
      res.status(201).json({
        result: 'ok',
        penalty: row,
      });
    }
  });
});

// reward
app.post('/api/mypage/rewards', (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  const sql = `SELECT transaction_date, money FROM management.transaction_history WHERE user_id='${id.userId}' AND transaction_type = 1 ORDER BY transaction_date`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: 'sql error' });
    } else {
      console.log('reward: ' + row);
      res.status(201).json({
        result: 'ok',
        rewards: row,
      });
    }
  });
});

/* Setting 정보 불러오기 */
app.post('/api/mypage/setting', (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);
  const sql = `SELECT permission_friend, permission_id, permission_challenge FROM management.user_info WHERE user_id= '${id.userId}'`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: 'sql error' });
    } else {
      console.log(row[0]);
      res.status(201).json({
        result: 'ok',
        permission_friend: row[0].permission_friend,
        permission_id: row[0].permission_id,
        permission_challenge: row[0].permission_challenge,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Connect at http://localhost:${port}`);
});
