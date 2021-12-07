const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'psy-computer.crufy7yefjsc.us-east-2.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: 'teamBdatabase',
  timezone: 'Asia/Seoul',
});

//모듈이란 관련된 객체들의 집합소. 즉, 위의 코드는 서버를 접속하는데 필수적인 내용이 들어가있는 코드 들인데 이들을 캡슐화 해서 향후에 server.js에서 사용하게 하기 위해
// 캡슐화를 시켜 exports를 시키는 것이다.
db.connect();
module.exports = db;
