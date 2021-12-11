const express = require("express");
const app = express();
const db = require("./config/db");
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer({ dest: "./server/upload" }); // 파일 업로드 할 폴더

const YOUR_SECRET_KEY = "abcd";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: 5000000 }));
app.use("/image", express.static("./server/upload")); // 클라이언트 입장에서 /image 라는 경로로 접근하도록 설정

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

app.post("/api/register", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  const name = req.body.name;
  const nickname = req.body.nickname;
  const birth = req.body.birth;
  const email = req.body.email;
  const phone = req.body.phone;

  const sql = `INSERT INTO management.user_info (user_id, password, name, nickname, birth, email, user_image, phone_number) VALUES ("${id}", "${password}", "${name}", "${nickname}", "${birth}", "${email}", null, "${phone}")`;

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err["sqlMessage"]);
      res.status(201).json({
        result: "error",
      });
    } else {
      res.status(201).json({
        result: "ok",
      });
    }
  });
});

// Duplicate ID Check
app.post("/api/duplicateId", (req, res) => {
  const id = req.body.id;

  const sql = `SELECT user_id FROM management.user_info WHERE user_id = "${id}"`;

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      
      if (row.length === 0) {
        res.status(201).json({
          result: 0,
        });
      } else {
        res.status(201).json({
          result: 1,
        });
      }
    }
  });
});

// Duplicate Nickname Check
app.post("/api/duplicateNick", (req, res) => {
  const nick = req.body.nick;

  const sql = `SELECT nickname FROM management.user_info WHERE nickname = "${nick}"`;

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      if (row.length === 0) {
        res.status(201).json({
          result: 0,
        });
      } else {
        res.status(201).json({
          result: 1,
        });
      }
    }
  });
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

app.post("/api/feed", (req, res) => {
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
      result: "ok",
      nickname: nickname,
      id: id.userId,
    });
  });
});

app.post("/api/friends", (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  const sql = `SELECT nickname from management.user_info WHERE user_id IN (SELECT target_mem_id FROM management.follow WHERE mem_id = "${id.userId}" AND agree = 1) OR user_id IN (SELECT mem_id FROM management.follow WHERE target_mem_id = "${id.userId}" AND agree = 1);`;

  // const sql = `SELECT nickname from management.user_info WHERE user_id IN (SELECT target_mem_id FROM management.follow WHERE mem_id = "${id.userId}")`;

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

app.post("/api/friendtodolist", (req, res) => {
  const name = req.body.name;
  let day = req.body.day.split("T")[0];
  let list;

  const sql = `SELECT * from management.plan WHERE user_id IN (SELECT user_id FROM management.user_info WHERE nickname = "${name}") AND DATE(plan_date) = "${day}"`;

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      list = row;
    }
    res.status(201).json({
      result: list,
    });
  });
});

app.post("/api/savecomment", (req, res) => {
  const token = req.body.token;
  const friend = req.body.friend;
  const day = req.body.day.split("T")[0];
  const comment = req.body.comment;

  const id = jwt.decode(token, YOUR_SECRET_KEY);

  const sql = `INSERT INTO management.comment (commented_nickname, comment, comment_user_id, comment_date) VALUES ("${friend}", "${comment}", "${id.userId}", "${day}") `;

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
});

app.post("/api/todolist", (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);
  let list;
  let day = req.body.day.split("T")[0];

  // const sql = `SELECT * FROM management.plan WHERE user_id = "${id.userId}" AND plan_date.substring(10) = "${day}"`;

  const sql = `SELECT * FROM management.plan WHERE user_id = "${id.userId}" AND DATE(plan_date) = "${day}" `;

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
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
  let photo = [];

  const sql = `SELECT plan_image FROM management.photo WHERE photo_user_id="${id.userId}" AND DATE(photo_date) = "${date}"`;

  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      rows.forEach((row) => {
        photo.push(row.plan_image);
      });
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

  const sql = `INSERT INTO management.plan (plan_date, plan_todo, plan_check, user_id) VALUES ("${day}", "${todo}", "false", "${id.userId}") `;

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
    }
  });
});

app.post("/api/check", (req, res) => {
  const user = req.body.user;
  const checked = req.body.checked;
  const idx = req.body.idx;

  const sql = `UPDATE management.plan SET plan_check="${checked}" WHERE idx="${idx}" AND user_id="${user}"`;

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
    }
  });

  // db.query(

  // )
});

app.post("/api/uploadimage", (req, res) => {
  const body = req.body.params;

  const img = body["img"];
  const date = body["date"];
  const token = body["token"];
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  const sql = `INSERT INTO management.photo (photo_user_id, photo_date, plan_image) VALUES ("${id.userId}", "${date}", "${img}")`;

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
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

app.post("/api/upLoadChallenge", upload.single("image"), (req, res) => {
  const body = req.body.params;

  const image = "/image/" + req.file.filename;
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY)["userId"];
  const name = req.body.Name;
  const StartDate = req.body.StartDate;
  const EndDate = req.body.EndDate;
  const Num = req.body.PeopleNum;
  const Fee = req.body.EntryFee;

  const type = req.body.type;

  db.query(`INSERT INTO management.challenge_info (challenge_name, date_finish, date_start, category, 
    participation_fee, max_participants, challenge_image, current_participants) VALUES 
  ("${name}","${EndDate}", "${StartDate}","${type}","${Fee}","${Num}", "${image}", "${1}" )`);
  db.query(
    `INSERT INTO management.challenge (user_id, reward_check, success, fail, challenge_id) SELECT "${id}", 0, 0, 0, challenge_id FROM management.challenge_info WHERE challenge_name = "${name}"`
  );

  const banking_query = `SELECT current_balance FROM management.transaction_history WHERE user_id='${id}' ORDER BY idx DESC`;
  db.query(banking_query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      const token = req.body.token;
      const fee = req.body.EntryFee;

      const id = jwt.decode(token, YOUR_SECRET_KEY)["userId"];

      const current_money = rows[0]["current_balance"];

      var info_sql = `INSERT INTO management.transaction_history (user_id, transaction_date, money, current_balance, transaction_type) VALUES ("${id}", NOW(), "${-fee}", "${
        current_money - fee
      }", 2)`;

      if (current_money > fee) {
        db.query(info_sql);
      }
    }
  });
});

app.post("/api/enrollChallenge", (req, res) => {
  const token = req.body.token;
  const data = req.body.data;
  const fee = req.body.Fee;
  const id = jwt.decode(token, YOUR_SECRET_KEY)["userId"];
  db.query(
    `INSERT INTO management.challenge (user_id, challenge_id, reward_check, success, fail) VALUES ("${id}","${data["id"]}", 0, 0, 0)`
  );
  db.query(
    `UPDATE management.challenge_info SET current_participants = current_participants + 1 WHERE challenge_id = ${data["id"]}`
  );
  const banking_query = `SELECT current_balance FROM management.transaction_history WHERE user_id='${id}' ORDER BY transaction_date DESC`;
  db.query(banking_query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      const token = req.body.token;
      const fee = req.body.data.fee;

      const id = jwt.decode(token, YOUR_SECRET_KEY)["userId"];

      const current_money = rows[0]["current_balance"];
      var info_sql = `INSERT INTO management.transaction_history (user_id, transaction_date, money, current_balance, transaction_type) VALUES ("${id}", NOW(), "${-fee}", "${
        current_money - fee
      }", 2)`;

      if (current_money > fee) {
        db.query(info_sql);
      }
    }
  });
});

app.get("/api/getMyChallengeList", (req, res) => {
  const token = req.query["token"];
  const userId = jwt.decode(token, YOUR_SECRET_KEY)["userId"];
  const sql_query = `SELECT * FROM management.challenge_info WHERE challenge_id IN (SELECT challenge_id FROM management.challenge WHERE user_id = "${userId}" AND reward_check = 0) `;
  db.query(sql_query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      challenge = [];
      for (let i = 0; i < rows.length; i++) {
        challenge.push({
          img: rows[i]["challenge_image"],
          id: rows[i]["challenge_id"],
          name: rows[i]["challenge_name"],
          startDate: rows[i]["date_start"],
          current_participants: rows[i]["current_participants"],
          endDate: rows[i]["date_finish"],
          category: rows[i]["category"],
          max_participants: rows[i]["max_participants"],
          fee: rows[i]["participation_fee"],
        });
      }
    }
    res.status(201).json({
      data: challenge,
      result: "ok",
      userId: userId,
    });
  });
});

app.get("/api/HotgetChallengeList", (req, res) => {
  // if(req.query['flagged'] === 1){
  //   return;
  // }

  const sql = "SELECT * FROM management.challenge_info";
  db.query(sql, (err, rows, fields) => {
    if (err) {
      res.status(400);
    } else {
      challenge = [];

      for (let i = 0; i < rows.length; i++) {
        challenge.push({
          img: rows[i]["challenge_image"],
          id: rows[i]["challenge_id"],
          name: rows[i]["challenge_name"],
          startDate: rows[i]["date_start"],
          current_participants: rows[i]["current_participants"],
          endDate: rows[i]["date_finish"],
          category: rows[i]["category"],
          max_participants: rows[i]["max_participants"],
          fee: rows[i]["participation_fee"],
        });
      }

      res.status(200).json({
        data: challenge,
        result: "ok",
      });
      return;
    }
  });
  return;
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
        phone: phone_number,
      });
    }
  });
});

app.get("/api/getChallengeList", (req, res) => {
  challenge = [];
  const sql = "SELECT * FROM management.challenge_info";
  db.query(sql, (err, rows, fields) => {
    if (err) {
      res.status(400);
    } else {
      challenge = [];

      for (let i = 0; i < rows.length; i++) {
        challenge.push({
          img: rows[i]["challenge_image"],
          id: rows[i]["challenge_id"],
          name: rows[i]["challenge_name"],
          startDate: rows[i]["date_start"],
          current_participants: rows[i]["current_participants"],
          endDate: rows[i]["date_finish"],
          category: rows[i]["category"],
          max_participants: rows[i]["max_participants"],
          fee: rows[i]["participation_fee"],
        });
      }
      res.status(200).json({
        data: challenge,
        result: "ok",
      });
      return;
    }
  });
  return;
});

/* Info 저장하기 */
app.post("/api/mypage/saveInfo", (req, res) => {
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
      res.status(400).json({ error: "sql error" });
    } else {
      res.status(201).json({
        result: "ok",
      });
    }
  });
});

/* mypage UserBlock에서 닉네임, 이미지 불러오기 */
app.post("/api/mypage/nickname", (req, res) => {
  const token = req.body.token;
  let nickname;

  const id = jwt.decode(token, YOUR_SECRET_KEY);
  const sql = `SELECT nickname, user_image FROM management.user_info WHERE user_id = '${id.userId}'`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json({
        result: "ok",
        nickname: row[0].nickname,
        image: row[0].user_image,
        id: id.userId,
      });
    }
  });
});

/* 닉네임 변경 or 등록 */
app.post("/api/mypage/saveNickname", (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  const nickname = req.body.nickname ? "'" + req.body.nickname + "'" : null;

  const sql = `UPDATE management.user_info SET nickname = ${nickname} WHERE user_id= '${id.userId}'`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "sql error" });
    } else {
      res.status(201).json({
        result: "ok",
      });
    }
  });
});

/* userBlock 이미지 등록 */
app.post("/api/mypage/savePhoto", upload.single("image"), (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  // const image = req.body.image ? "'" + req.body.image + "'" : null;
  const image = "'" + "/image/" + req.file.filename + "'";

  const sql = `UPDATE management.user_info SET user_image = ${image} WHERE user_id= '${id.userId}'`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "sql error" });
    } else {
      res.status(201).json({
        result: "ok",
      });
    }
  });
});

/* challenge 세부정보 불러오기*/
app.post("/api/challenge_ing", (req, res) => {
  const token = req.body.token;
  const cid = req.body.challenge_id;
  const today = req.body.today;

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
      infos.push({
        id: rows.length + 1,
        done: false,
        state: false,
        checked: false,
        cert: false,
        date: today,
      });

      res.status(201).json({
        result: "ok",
        rows: infos,
      });
    }
  });
});

/* (임시) challenge 이미지, 날짜 불러오기*/
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
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  let date;
  let todo;
  let check;
  let infos = [];

  const sql = `SELECT * FROM management.challenge_todo WHERE challenge_id = '${challenge_id}' AND user_id = '${id.userId}'`; //date_format(date_start, '%Y-%m-%d'), date_format(date_finish, '%Y-%m-%d'), challenge_image, challenge_name, challenge_id
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

/* cert업로드 조정필요함*/
app.post("/api/certupload", upload.single("img"), (req, res) => {
  const body = req.body;
  const challenge_id = body["challenge_id"];
  const img = "/image/" + req.file.filename;
  const user_id = body["user_id"];
  const challenge_date = body["challenge_date"];

  //const sql = `UPDATE management.challenge_ing SET is_cert = 0 `; 모든 is_cert 1로
  const sql = `UPDATE management.challenge_ing SET challenge_image = '${img}' WHERE user_id = '${user_id}' AND challenge_id = '${challenge_id}' AND challenge_date = '${challenge_date}'`;
  //const sql = `INSERT INTO management.challenge_ing (challenge_date, user_id, challenge_image, mate_check, challenge_id,is_cert) VALUES ('${challenge_date}','${user_id}', "${img}", 0, ${challenge_id},0) `

  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
});

/* challenge todo업로드 */
app.post("/api/ctodoupload", (req, res) => {
  //필요: idx, date, user_id, challtodo, todocheck, challenge_id-----------------------------------------------
  const body = req.body.params;
  const todo = body["todo"];
  const challenge_id = body["challenge_id"];
  const challenge_date = body["challenge_date"];
  const token = body["token"];
  const user_id = jwt.decode(token, YOUR_SECRET_KEY);

  const sql = `SELECT * FROM management.challenge_ing WHERE user_id = '${
    user_id.userId
  }' AND challenge_id = '${challenge_id}' AND challenge_date = '${challenge_date.substring(
    0,
    10
  )}'`;

  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      if (rows.length === 0) {
        let sql2 = `INSERT INTO management.challenge_ing (challenge_date, user_id, challenge_image, mate_check, challenge_id, is_cert) VALUES ('${challenge_date}','${user_id.userId}', "/image/3b152de8c557655879479a3ab94aeb89", 0, ${challenge_id}, 1) `;
        db.query(sql2);
        db.query(
          `INSERT INTO management.challenge_todo (challenge_date, user_id, challenge_todo, todo_check, challenge_id) VALUES ('${challenge_date}','${user_id.userId}', "${todo}", 0, ${challenge_id}) `
        );
      } else {
        db.query(
          `INSERT INTO management.challenge_todo (challenge_date, user_id, challenge_todo, todo_check, challenge_id) VALUES ('${challenge_date}','${user_id.userId}', "${todo}", 0, ${challenge_id}) `
        );
      }
    }
  });
});

/* cert 이미지 불러오기 */
app.post("/api/challenge_ing_img", (req, res) => {
  const token = req.body.token;
  const cid = req.body.challenge_id;

  let infos = [];
  let img;
  let date;
  let ischecked;

  const id = jwt.decode(token, YOUR_SECRET_KEY);

  const sql = `SELECT * FROM management.challenge_ing WHERE user_id = '${id.userId}' AND challenge_id = '${cid}'`;

  db.query(sql, (err, rows, fields) => {
    if (err) {
      res.status(201).json({
        result: "not ok",
      });
    } else {
      for (let i = 0; i < rows.length; i++) {
        date = rows[i].challenge_date;
        img = rows[i].challenge_image;
        ischecked = rows[i].mate_check;

        infos.push({
          id: i,
          img: img,
          date: date,
          ischecked: ischecked,
        });
      }
      res.status(201).json({
        result: "ok",
        rows: infos,
      });
    }
  });
});

app.post("/api/mypage/currentBalance", (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  const sql = `SELECT current_balance FROM management.transaction_history WHERE user_id='${id.userId}' ORDER BY idx DESC LIMIT 1`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "sql error" });
    } else {
      if (row.length !== 0) {
        res.status(201).json({
          result: "ok",
          balance: row[0].current_balance,
        });
      } else {
        res.status(201).json({
          result: "ok",
          balance: 0,
        });
      }
    }
  });
});

/* mypage의 Charge 불러오기 */
// todo: 스터디 참여(type = 2)할 경우 잔액에서 - 해줘야 함.
app.post("/api/mypage/charge", (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  const sql = `SELECT transaction_date, money, current_balance FROM management.transaction_history WHERE user_id= '${id.userId}' AND transaction_type = 0 ORDER BY transaction_date`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "sql error" });
    } else {
      res.status(201).json({
        result: "ok",
        history: row,
      });
    }
  });
});

/* 충전하기 */
app.post("/api/mypage/chargeMoney", (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);
  const chargeMoney = Number(req.body.chargeMoney);
  const currentBalance = Number(req.body.currentBalance) + chargeMoney;

  const sql = `INSERT INTO management.transaction_history (user_id, transaction_date, money, current_balance, transaction_type) VALUES ("${id.userId}", NOW(), ${chargeMoney}, ${currentBalance}, 0)`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "sql error" });
    } else {
      res.status(201).json({
        result: "ok",
      });
    }
  });
});

/* penalty와 reward 불러오기 */
// penalty
app.post("/api/mypage/penalty", (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  const sql = `SELECT transaction_date, money FROM management.transaction_history WHERE user_id='${id.userId}' AND transaction_type = 3 ORDER BY transaction_date`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "sql error" });
    } else {
      res.status(201).json({
        result: "ok",
        penalty: row,
      });
    }
  });
});

// reward
app.post("/api/mypage/rewards", (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);
  const sql = `SELECT transaction_date, money FROM management.transaction_history WHERE user_id='${id.userId}' AND transaction_type = 1 ORDER BY transaction_date`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "sql error" });
    } else {
      res.status(201).json({
        result: "ok",
        rewards: row,
      });
    }
  });
});

/* Setting 정보 불러오기 */
app.post("/api/mypage/setting", (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);
  const sql = `SELECT permission_friend, permission_id, permission_challenge FROM management.user_info WHERE user_id= '${id.userId}'`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "sql error" });
    } else {
      res.status(201).json({
        result: "ok",
        permission_friend: row[0].permission_friend,
        permission_id: row[0].permission_id,
        permission_challenge: row[0].permission_challenge,
      });
    }
  });
});

/* Setting 정보 저장 */
app.post("/api/mypage/saveSetting", (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  const permission_friend = req.body.permission_friend === true ? 1 : 0;
  const permission_id = req.body.permission_id === true ? 1 : 0;
  const permission_challenge = req.body.permission_challenge === true ? 1 : 0;

  const sql = `UPDATE management.user_info SET permission_friend = ${permission_friend}, permission_id = ${permission_id}, permission_challenge = ${permission_challenge} WHERE user_id= '${id.userId}'`;
  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "sql error" });
    } else {
      res.status(201).json({
        result: "ok",
      });
    }
  });
});

/* mate 불러오기 */
app.post("/api/challenge_mate", (req, res) => {
  const token = req.body.token;
  const cid = req.body.challenge_id;
  const today = req.body.today;

  let mateid = "psy";

  let infos = [];
  let isdone;
  let isstate;
  let ischecked;
  let iscert;
  let date;

  let todo;
  let check;
  let infos2 = [];

  let infos3 = [];
  let img;

  let nickname;

  const id = jwt.decode(token, YOUR_SECRET_KEY);

  const sql = `SELECT * FROM management.challenge WHERE user_id = '${id.userId}' AND challenge_id = ${cid}`;
  let sql2 = `SELECT * FROM management.challenge user_id = '${id.userId}' AND challenge_id = '${cid}'`;
  let sql3 = `SELECT * FROM management.challenge user_id = '${id.userId}' AND challenge_id = '${cid}'`;
  let sql4 = `SELECT * FROM management.challenge user_id = '${id.userId}' AND challenge_id = '${cid}'`;
  let sql5 = `SELECT * FROM management.challenge user_id = '${id.userId}' AND challenge_id = '${cid}'`;

  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      mateid = rows[0].mate;
      sql2 = `SELECT * FROM management.challenge_ing WHERE user_id = '${mateid}' AND challenge_id = ${cid}`;
      db.query(sql2, (err, rows, fields) => {
        if (err) {
          console.log(err);
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

          infos.push({
            id: rows.length + 1,
            done: false,
            state: false,
            checked: false,
            cert: false,
            date: today,
          });
          sql3 = `SELECT * FROM management.challenge_todo WHERE challenge_id = ${cid} AND user_id = '${mateid}'`;
          db.query(sql3, (err, rows, fields) => {
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

                infos2.push({
                  id: i + 1,
                  text: todo,
                  checked: check,
                  date: date,
                  matenick: mateid,
                });
              }
              sql4 = `SELECT * FROM management.challenge_ing WHERE user_id = '${mateid}' AND challenge_id = ${cid}`;
              db.query(sql4, (err, rows, fields) => {
                if (err) {
                  console.log(err);
                } else {
                  for (let i = 0; i < rows.length; i++) {
                    date = rows[i].challenge_date;
                    img = rows[i].challenge_image;
                    ischecked = rows[i].mate_check;

                    infos3.push({
                      id: i,
                      img: img,
                      date: date,
                      ischecked: ischecked,
                    });
                  }
                  sql5 = `SELECT nickname FROM management.user_info WHERE user_id = '${mateid}'`;
                  db.query(sql5, (err, row, fields) => {
                    if (err) {
                      console.log(err);
                    } else {
                      nickname = row[0].nickname;
                    }
                    res.status(201).json({
                      result: "ok",
                      mcinfo: infos,
                      mctodo: infos2,
                      mcimg: infos3,
                      matenick: nickname,
                      maid: mateid,
                    });
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

app.post("/api/loadcomment", (req, res) => {
  const token = req.body.token;
  const date = req.body.date;
  const friend_name = req.body.friend_name;
  let lists;

  const id = jwt.decode(token, YOUR_SECRET_KEY);
  let sql;

  if (friend_name !== null) {
    sql = `SELECT comment_user_id, comment FROM management.comment WHERE commented_nickname = "${friend_name}" AND comment_date = "${date}"`;
  } else {
    sql = `SELECT comment_user_id, comment FROM management.comment WHERE commented_nickname IN (SELECT nickname FROM management.user_info WHERE user_id = "${id.userId}")`;
  }

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
      lists = row;
    }
    res.status(201).json({
      result: lists,
    });
  });
});

/* ChallengeFinishModal */
/* 1등 id 받아오기 */
app.get("/api/getChallengeWinner", (req, res) => {
  const challenge_id = req.query.challengeId;

  const sql = `SELECT user_id FROM management.challenge WHERE challenge_id = ${challenge_id} AND success=(SELECT max(success) FROM management.challenge WHERE challenge_id = ${challenge_id})`;

  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      winners = [];
      for (let i = 0; i < rows.length; i++) {
        winners.push(rows[i].user_id);
      }
    }
    res.status(201).json({
      result: "ok",
      winners: winners,
    });
  });
});

/* 전체 패널티 값 계산하기 */
app.get("/api/getChallengeTotalPenalty", (req, res) => {
  const challenge_id = req.query.challengeId;
  const penaltyFee = Number(req.query.penaltyFee);

  // 패널티 횟수 불러옴
  const sql = `SELECT sum(fail) as total FROM management.challenge WHERE challenge_id = ${challenge_id}`;
  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      total = rows[0].total * penaltyFee;
    }
    res.status(201).json({
      result: "ok",
      totalFee: total,
    });
  });
});

/* 전체 값 계산(success, fail 값 전달) */
app.post("/api/getChallengeResult", (req, res) => {
  const token = req.body.token;
  const challenge_id = req.body.challengeId;
  const userId = jwt.decode(token, YOUR_SECRET_KEY).userId;
  const NumOfWinner = Number(req.body.NumOfWinner);
  const totalPenalty = Number(req.body.totalPenalty);

  const sql = `SELECT success, fail FROM management.challenge WHERE challenge_id = ${challenge_id} AND user_id = '${userId}'`;
  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        result: err,
      });
    } else {
      res.status(201).json({
        result: "ok",
        success: rows[0].success,
        fail: rows[0].fail,
        rewards: Math.ceil(totalPenalty / NumOfWinner),
      });
    }
  });
});

app.post("/api/loadChallenge", (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);
  let challenges = [];

  const sql = `SELECT challenge_name, challenge_image, challenge_id FROM management.challenge_info WHERE challenge_id in (SELECT challenge_id FROM management.challenge WHERE user_id = "${id.userId}")`;
  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      rows.forEach((row) => {
        challenges.push({
          challenge_id: row["challenge_id"],
          challenge_name: row["challenge_name"],
          challenge_image: row["challenge_image"],
        });
      });
    }

    res.status(201).json({
      result: challenges,
    });
  });
});

app.post("/api/cert", (req, res) => {
  const body = req.body;
  const challenge_id = body["challenge_id"];
  const cert = body["cert"];
  const user_id = body["user_id"];
  const challenge_date = body["challenge_date"];

  const sql = `UPDATE management.challenge_ing SET mate_check = ${cert} WHERE user_id = '${user_id}' AND challenge_id = ${challenge_id} AND challenge_date = '${challenge_date}'`;
  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
});

app.post("/api/searchFriend", (req, res) => {
  const search_friend = req.body.search_friend;
  console.log(search_friend)
  const sql = `SELECT user_id FROM management.user_info WHERE nickname = "${search_friend}"`;

  let searched_id = "";

  db.query(sql, (err, row, fields) => {


    if(row.length !== 0){
      searched_id = row[0].user_id;
    } else {
      searched_id = ""
    }
    res.status(201).json({
      result: searched_id,
    });
  });
});

app.post("/api/sendingFriend", (req, res) => {
  const target_mem_id = req.body.target_mem_id;
  const token = req.body.mem_token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);

  // `INSERT INTO management.challenge (user_id, challenge_id) VALUES ("${id}","${data["id"]}")`

  const sql = `INSERT INTO management.follow (mem_id, target_mem_id, agree) VALUES ("${id.userId}", "${target_mem_id}", 0)`;

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
});

app.post("/api/loadSendingFriend", (req, res) => {
  const token = req.body.token;
  const id = jwt.decode(token, YOUR_SECRET_KEY);
  let nicknames = [];

  const sql = `SELECT nickname FROM management.user_info WHERE user_id IN (SELECT mem_id FROM management.follow WHERE target_mem_id = "${id.userId}" AND agree = 0 ) `;

  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      rows.forEach((row) => {
        nicknames.push(row["nickname"]);
      });
    }
    res.status(201).json({
      result: nicknames,
    });
  });
});

// const sql = `UPDATE management.plan SET plan_check="${checked}" WHERE idx="${idx}" AND user_id="${user}"`;

app.post("/api/setAgree", (req, res) => {
  const nickname = req.body.nickname;

  const sql = `UPDATE management.follow SET agree = 1 WHERE mem_id IN (SELECT user_id FROM management.user_info WHERE nickname="${nickname}")`;

  db.query(sql, (err, row, fields) => {
    if (err) {
      console.log(err);
    } else {
    }
    res.status(201).json({
      message: "ok",
    });
  });
});

app.post("/api/friendPhotolist", (req, res) => {
  const nickname = req.body.nickname;
  const date = req.body.date;
  let photo = [];

  const sql = `SELECT plan_image FROM management.photo WHERE photo_user_id = (SELECT user_id FROM management.user_info WHERE nickname="${nickname}") AND DATE(photo_date) = "${date}"`;

  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      rows.forEach((row) => {
        photo.push(row.plan_image);
      });
    }
    res.status(201).json({
      result: photo,
    });
  });
});

/* 저장하기 */
app.post("/api/saveFee", (req, res) => {
  const token = req.body.token;
  const challenge_id = req.body.challengeId;
  const userId = jwt.decode(token, YOUR_SECRET_KEY).userId;
  const returnFee = Number(req.body.returnFee);
  const penalty = -Number(req.body.penalty);
  const rewards = Number(req.body.rewards);
  const isWinner = req.body.isWinner;
  const current_balance = Number(req.body.currentBalance);

  if (isWinner) {
    // 상금 저장하기
    db.query(
      `INSERT INTO management.transaction_history (user_id, transaction_date, money, transaction_type) VALUES ("${userId}", NOW(), ${rewards}, 1)`
    );

    // 패널티 저장
    db.query(
      `INSERT INTO management.transaction_history (user_id, transaction_date, money, transaction_type) VALUES ("${userId}", NOW(), ${penalty}, 3)`
    );

    // 환급금액 저장
    db.query(
      `INSERT INTO management.transaction_history (user_id, transaction_date, money, current_balance, transaction_type) VALUES ("${userId}", NOW(), ${returnFee}, ${
        current_balance + rewards + returnFee
      }, 4)`
    );
  } else {
    // 패널티 저장
    db.query(
      `INSERT INTO management.transaction_history (user_id, transaction_date, money, transaction_type) VALUES ("${userId}", NOW(), ${penalty}, 3)`
    );

    // 환급금액 저장
    db.query(
      `INSERT INTO management.transaction_history (user_id, transaction_date, money, current_balance, transaction_type) VALUES ("${userId}", NOW(), ${returnFee}, ${
        current_balance + returnFee
      }, 4)`
    );
  }
  // 챌린지 테이블에서 false로 변경하기
  db.query(
    `UPDATE management.challenge SET reward_check = 1 WHERE user_id= '${userId}' AND challenge_id = ${challenge_id}`
  );
  res.status(201).json({
    result: "ok",
  });
});

app.listen(port, () => {
  console.log(`Connect at http://localhost:${port}`);
});
