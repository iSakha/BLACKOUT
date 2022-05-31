"use strict";

const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");

const pool = require('./config/database');
const eventRouter = require("./routes/eventRouter");
const authRouter = require("./routes/authRouter");

const PORT = 3070;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let warehousesObj = {};
readWarehouses();

app.use('/events', eventRouter);
app.use('/login', authRouter);

app.get('/checkDBconn', (req, res) => {
    pool.getConnection((err, connection) => {
      if (!err) {
        // console.log('connect!')
        connection.release();
        res.json({message:'Successfully connected to MySQL database!'});
      } else {
        console.log('err:', err);
        res.send({message:'We\'ve got a problem!'});
      }
    })
    
  });

  app.route('/warehouses').get((request, response) => {
    response.json(warehousesObj);
});



//          F U N C T I O N S
// --------------------------------------------------------------------
// --------------------------------------------------------------------


//        readWarehouses function
// --------------------------------------------------------------------
function readWarehouses() {

  pool.query('SELECT * FROM t_warehouses', (err, result) => {
      if (err) {
          console.log('Error while fetching events', err);
      } else {
          console.log('Warehouses fetched successfully');
          warehousesObj = result;
          console.log(warehousesObj);
      }
  })
}

//          S E R V E R
// --------------------------------------------------------------------
app.listen(PORT, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("listening on port", PORT);
});