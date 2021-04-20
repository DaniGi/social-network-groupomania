require('dotenv').config();
const mysql = require('mysql');

const con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});

// docker run --name groupomania-DB -dp 3306:3306 -v groupomania-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=calogero67 mysql:5.7
