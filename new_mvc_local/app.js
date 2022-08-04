"use strict";

const express = require("express");
const app = express();
const cors = require("cors");

const eventRouter = require("./routes/eventRouter");
const authRouter = require("./routes/authRouter");
const rootRouter = require("./routes/rootRouter");
const equipRouter = require("./routes/equipRouter");
const eventEquipRouter = require("./routes/eventEquipRouter");
const bookingRouter = require("./routes/bookingRouter");

const PORT = 3070;
// const PORT = process.env.PORT || 80;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', rootRouter);
app.use('/events', eventRouter);
app.use('/login', authRouter);
app.use('/equip', equipRouter);
app.use('/eventequip', eventEquipRouter);
app.use('/booking', bookingRouter);



//          S E R V E R
// --------------------------------------------------------------------
app.listen(PORT, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("listening on port", PORT);
});