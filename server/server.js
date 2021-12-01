const express = require('express');
const app = express();
const db = require('./config/db');
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const { application } = require('express');


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
  // console.log("디코드", jwt.decode(token, YOUR_SECRET_KEY));
  
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

app.post('/api/todolist', (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);
  let list;

  const sql = `SELECT * FROM management.plan WHERE user_id = "${id.userId}"`; 

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
  } else {
    // console.log( 'todolist', row);
    list = row;
    console.log('list', list);
  }
  res.status(201).json({
    result: list,
  });


  })

})

app.post('/api/todo', (req, res) => {
  const todo = req.body.todo;
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);
  console.log(todo, token);

  db.query(

    `INSERT INTO management.plan (plan_date, plan_todo, plan_check, user_id) VALUES (NOW(), "${todo}", "false", "${id.userId}") `

  )
})

app.post('/api/delete', (req, res) => {
  const user = req.body.user;
  const idx = req.body.idx;

  const sql = `DELETE FROM management.plan WHERE idx="${idx}" AND user_id="${user}" `

  db.query(sql, (err, row, fields) => {
    if(err){
      console.log(err);
    } else {
      console.log("delete", idx);
    }
  })
});

app.post('/api/check', (req, res) => {
  const user = req.body.user;
  const checked = req.body.checked;
  const idx = req.body.idx;

  console.log(idx, checked, user);
  
  const sql = `UPDATE management.plan SET plan_check="${checked}" WHERE idx="${idx}" AND user_id="${user}"`

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log("무한대");
    }
  });

  // db.query(


  // )

})

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

app.listen(port, () => {
  console.log(`Connect at http://localhost:${port}`);
});
