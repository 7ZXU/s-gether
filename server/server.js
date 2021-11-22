const express = require("express"); 
const app = express();
const db = require('./config/db');
const port = 5000
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
 });
app.set('port', process.env.PORT || port);

app.post('/Register', (req, res) =>{
    const usrId = req.body.usrId;
    const usrPw = req.body.usrPassword;
    db.query(`INSERT INTO management.user (id, password) VALUES ("${usrId}", "${usrPw}")`);
})

app.get('/api/user', (req,res)=> {
    db.query(
        "SELECT * FROM management.user",
        (err, rows, fields) => {
            res.send(rows);
        }

    )
});

app.post("/api/user2", (req, res) => {
    let isUser = false;
    const { userId, userPassword } = req.body;
    console.log("name :", userId);
    console.log("name :", userPassword);
    // console.log(req.headers.cookie);
    //var cookies = cookie.parse(req.headers.cookie);
    //console.log(cookies.user);
  
    const sql = "SELECT id, password FROM management.user";//"SELECT userId, userPassword FROM management.user"
    db.query(sql, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rows);
        rows.forEach((info) => {
          if (info.id === userId && info.password === userPassword) {
            isUser = true;
          } else {
            return;
          }
        });
        if (isUser) {
            console.log("맞다");
          /*const YOUR_SECRET_KEY = process.env.SECRET_KEY;
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
          });*/
        } else {
            console.log("아니다");
          //res.status(400).json({ error: 'invalid user' });
        }
      }
    });
  });







app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
    
})