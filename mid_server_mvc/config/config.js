
const mysql = require("mysql2");

const dbConn = mysql.createConnection({
  host: 'localhost',
  // port: 3306,

  port: 23308,
  user: "black_user",
  password: "test_black",
  database: "b_out"

  // port: 23308,
  // user: "aestheti_test_user",
  // password: "Sakha2836",
  // database: "aestheti_test_db"

});

dbConn.connect(function (error) {
  if (error) throw error;
  console.log('Database Connected Successfully!!!');
})

module.exports = dbConn;