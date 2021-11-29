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

app.post('/api/login', (req, res) => {
  let isUser = false;

  const userId = req.body.inputId;
  const userPassword = req.body.inputPw;
  const sql = 'SELECT id, password FROM management.user';
  db.query(sql, (err, rows, fields) => {
    if (err) {
      0;
      console.log(err);
    } else {
      rows.forEach((info) => {
        if (info.id === userId && info.password === userPassword) {
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

app.listen(port, () => {
  console.log(`Connect at http://localhost:${port}`);
});
