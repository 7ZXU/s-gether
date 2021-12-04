const express = require("express");
const app = express();
const db = require("./config/db");
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const { application } = require("express");
const multer = require('multer');
const upload = multer({dest: './server/upload'});

const YOUR_SECRET_KEY = "abcd";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/image', express.static('./server/upload')); // 사용자는 image 폴더로 접근하면 // 서버의 upload 폴더로 접근 


app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.set("port", process.env.PORT || port);

app.post("/Register", (req, res) => {
  const usrId = req.body.usrId;
  const usrPw = req.body.usrPassword;
  // 복호화하는 부분에 대해 아직 해결 못했으므로 일단 그냥 pw 저장
  // const hashedusrPw = bcrypt.hashSync(usrPw, 10);
  db.query(
    `INSERT INTO management.user_info (user_id, password) VALUES ("${usrId}", "${usrPw}")`
  );
});

app.post('/api/saveimage', upload.single('image'), (req, res) => {

  // const token = req.body.token;
  // const photo_date = req.body.day;
  // const plan_image = '/image/' + req.body.filename;

  // const id = jwt(token, YOUR_SECRET_KEY);
  // const user_id = id.userId;


  // const sql = `INSERT INTO management.photo VALUES (${user_id}, ${photo_date}, ${plan_image})`;

  // db.query(sql, (err, rows, fields) =>{
  //   res.send(rows);
  // })


})

app.post("/api/feed", (req, res) => {
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
      result: "ok",
      nickname: nickname,
      id: id.userId,
    });
  });
});

app.post("/api/friendpage", (req, res) => {
  const friend = req.body.friend;
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);
  console.log("api/friendpage", friend);

  let list;

  const sql = `SELECT * FROM management.plan WHERE user_id = "${friend}"`;

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      list = row;
      console.log(list);
    }
    res.status(201).json({
      result: list,
    });
  });
});

app.post("/api/friends", (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  const sql = `SELECT nickname from management.user_info WHERE user_id IN (SELECT target_mem_id FROM management.follow WHERE mem_id = "${id.userId}")`;

  let friends = [];

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      for (r in row) {
        friends.push(row[r].nickname);
      }
    }
    res.status(201).json({
      result: friends,
    });
  });
});

app.post("/api/friendtodolist" , (req, res) => {
  const name = req.body.name;
  let day = req.body.day.split("T")[0];
  let list;

  console.log(name);

  const sql = `SELECT * from management.plan WHERE user_id IN (SELECT user_id FROM management.user_info WHERE nickname = "${name}") AND DATE(plan_date) = "${day}"`;

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log( 'todolist', row);
      list = row;
      console.log('list', list);
    }
    res.status(201).json({
      result: list,
    });
  });

})

app.post("/api/savecomment", (req, res) => {
  

  const token = req.body.token;
  const friend = req.body.friend;
  const day = req.body.day;
  const comment = req.body.comment;

  const id = jwt.decode(token, YOUR_SECRET_KEY);

  console.log("api/savecomment", id.userId, friend, day, comment)
  db.query(
    `INSERT INTO management.comment (commented_nickname, comment, comment_user_id, comment_date) VALUES ("${friend}", "${comment}", "${id.userId}", "${day}") `
  );



})

app.post("/api/todolist", (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);
  let list;
  let day = req.body.day.split("T")[0];

  console.log("/api/todolist", day, id.userId);

  // const sql = `SELECT * FROM management.plan WHERE user_id = "${id.userId}" AND plan_date.substring(10) = "${day}"`;
  
  const sql = `SELECT * FROM management.plan WHERE user_id = "${id.userId}" AND DATE(plan_date) = "${day}" `;

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      // console.log( 'todolist', row);
      list = row;
    }
    res.status(201).json({
      result: list,
    });
  });
});

app.post("/upload", (req, res) => {
  const files = req.body.files;
});

app.post("/api/photolist", (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);
  const date = req.body.date;
  let photo;

  const sql = `SELECT plan_image FROM management.photo WHERE user_id="${id.userId} AND DATE(plan_date) = "${date}"`;

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      photo = row;
    }
    res.status(201).json({
      result: photo,
    });
  });
});

app.post("/api/todo", (req, res) => {
  const todo = req.body.todo;
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  const day = req.body.day;
  console.log("api/todo/day", day);

  
  const sql =  `INSERT INTO management.plan (plan_date, plan_todo, plan_check, user_id) VALUES ("${day}", "${todo}", "false", "${id.userId}") `
  
  db.query(sql);
});

app.post("/api/delete", (req, res) => {
  const user = req.body.user;
  const idx = req.body.idx;

  const sql = `DELETE FROM management.plan WHERE idx="${idx}" AND user_id="${user}" `;

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log("delete", idx);
    }
  });
});

app.post("/api/check", (req, res) => {
  const user = req.body.user;
  const checked = req.body.checked;
  const idx = req.body.idx;

  console.log(idx, "/api/check", checked);

  const sql = `UPDATE management.plan SET plan_check="${checked}" WHERE idx="${idx}" AND user_id="${user}"`;

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log("무한대");
    }
  });

  // db.query(

  // )
});

app.post("/api/login", (req, res) => {
  let isUser = false;

  const userId = req.body.inputId;
  const userPassword = req.body.inputPw;

  const sql = "SELECT user_id, password FROM management.user_info";
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
            expiresIn: "1h",
          }
        );
        res.cookie("user", accessToken);
        res.status(201).json({
          result: "ok",
          accessToken,
        });
      } else {
        res.status(400).json({ error: "invalid user" });
      }
    }
  });
});

/* mypage의 Info 불러오기 */
app.post("/api/mypage/info", (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);
  const sql = `SELECT name, nickname, birth, email, phone_number FROM management.user_info WHERE user_id= '${id.userId}'`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "sql error" });
    } else {
      console.log(row[0]);
      const name = row[0].name;
      const nickname = row[0].nickname;
      const birth = row[0].birth;
      const email = row[0].email;
      const phone_number = row[0].phone_number;

      res.status(201).json({
        result: "ok",
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
app.post("/api/mypage/nickname", (req, res) => {
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
        result: "ok",
        nickname: nickname,
        id: id.userId,
      });
    }
  });
});

/* mypage의 Charge 불러오기 */
app.post("/api/mypage/charge", (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  let history = [];
  let history_data = {};

  const sql = `SELECT transaction_date, money, current_balance FROM management.transaction_history WHERE user_id= '${id.userId}' AND transaction_type = 0 ORDER BY transaction_date`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "sql error" });
    } else {
      console.log(row);
      history = row;
      res.status(201).json({
        result: "ok",
        history: row,
      });
    }
  });
});

/* challenge 세부정보 불러오기*/
app.post("/api/challenge_ing", (req, res) => {
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
        result: "not ok",
      });
    } else {
      for (let i = 0; i < rows.length; i++) {
        /*if(오늘 날짜와 비교){
                isstate = true; 회색?
              }*/
        date = rows[i].challenge_date;
        isstate = true;
        if (rows[i].is_cert === 0) {
          iscert = false;
        } else {
          iscert = true;
        }
        if (rows[i].mate_check === 0) {
          // mate 체크 안함
          ischecked = false;
          isdone = false;
        } else if (rows[i].mate_check === 1) {
          //mate 성공
          ischecked = true;
          isdone = true;
        } else {
          //mate 실패
          ischecked = true;
          isdone = false;
        }

        infos.push({
          //{ id: 1, done: true, state: true, checked: true, cert: true }
          id: i,
          done: isdone,
          state: isstate,
          checked: ischecked,
          cert: iscert,
          date: date,
        });
      }
      if (rows.length < 30) {
        for (let i = rows.length + 1; i < 30; i++) {
          infos.push({
            id: i,
            done: false,
            state: false,
            checked: false,
            cert: false,
            date: "2000-01-01",
          });
        }
      }
      res.status(201).json({
        result: "ok",
        rows: infos,
      });
    }
  });
});

/* (임시) challenge 이미지 날짜 불러오기*/
app.post("/api/challenge_info", (req, res) => {
  const token = req.body.token;
  const challenge_id = req.body.challenge_id;

  let challenge_image;
  let cname;
  let cstart;
  let cend;

  const sql = `SELECT * FROM management.challenge_info WHERE challenge_id = '${challenge_id}'`; //date_format(date_start, '%Y-%m-%d'), date_format(date_finish, '%Y-%m-%d'), challenge_image, challenge_name, challenge_id
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
      result: "ok",
      image: challenge_image,
      start: cstart,
      end: cend,
      name: cname,
    });
  });
});

/* challenge todo*/
app.post("/api/challenge_todo", (req, res) => {
  const token = req.body.token;
  const challenge_id = req.body.challenge_id;
  const user_id = req.body.user_id;

  let date;
  let todo;
  let check;
  let infos = [];

  const sql = `SELECT * FROM management.challenge_todo WHERE challenge_id = '${challenge_id}' AND user_id = '${user_id}'`; //date_format(date_start, '%Y-%m-%d'), date_format(date_finish, '%Y-%m-%d'), challenge_image, challenge_name, challenge_id
  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < rows.length; i++) {
        date = rows[i].challenge_date;
        todo = rows[i].challenge_todo;
        if (rows[i].todo_check === 1) {
          check = true;
        } else {
          check = false;
        }

        infos.push({
          id: i + 1,
          text: todo,
          checked: check,
          date: date,
        });
      }
    }
    res.status(201).json({
      result: "ok",
      rows: infos,
    });
  });
});

/* cert업로드 */
app.post("/api/certupload", (req, res) => {
  const challenge_id = req.body.challenge_id;
  const formdata = req.body.formdata;
  const config = req.body.config;
  const user_id = req.body.user_name;
  const challenge_date = req.body.challenge_id;

  //const sql = `UPDATE management.challenge_ing SET is_cert = 0 `; 모든 is_cert 1로
  const sql = `UPDATE management.challenge_ing SET challenge_image = '${formdata}' WHERE challenge_id = '${challenge_id}' AND user_id = '${user_id}' AND challenge_date = '${challenge_date}'`;
  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log("DB저장 실패");
      console.log(err);
    } else {
      console.log("DB저장 성공");
    }
  });
});

app.listen(port, () => {
  console.log(`Connect at http://localhost:${port}`);
});
