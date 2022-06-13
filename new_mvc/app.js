"use strict";

const express = require("express");
const app = express();
const cors = require("cors");

const pool = require('./config/database');
const eventRouter = require("./routes/eventRouter");
const authRouter = require("./routes/authRouter");

const PORT = 3070;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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


//          S E R V E R
// --------------------------------------------------------------------
app.listen(PORT, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("listening on port", PORT);
});