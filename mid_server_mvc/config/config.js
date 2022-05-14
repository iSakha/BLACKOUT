
const mysql = require("mysql2");

const dbConn = mysql.createConnection({
  host: 'localhost',
  // port: 3306,
<<<<<<< HEAD
  port: 23308,
  user: "black_user",
  password: "test_black",
  database: "b_out"
=======
  // port: 23308,
  user: "aestheti_test_user",
  password: "Sakha2836",
  database: "aestheti_test_db"
>>>>>>> e2fd97a80b2143b4c68f555daca105d1e13a7e0b
});

dbConn.connect(function (error) {
  if (error) throw error;
  console.log('Database Connected Successfully!!!');
})

module.exports = dbConn;