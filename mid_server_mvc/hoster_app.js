const express = require("express");
const app = express();
const cors = require("cors");

const dbConn = require('./config/config.js');

const eventRouter = require("./routes/eventRouter.js");
const equipRouter = require("./routes/equipRouter.js");
const userRouter = require("./routes/userRouter.js");

let calendarsObj;
let eventStatusObj;
let managersObj;
let locationsObj;
let clientObj;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const urlencodedParser = express.urlencoded({ extended: false });

readCalendars();
readEventStatus();
readManagers();
readLocations();
readClients();


app.route('/').get((request, response) => {
    response.send('<h2>my mid_server_MVC is running</h2>');
});

app.route('/cities').get((request, response) => {
    response.json(calendarsObj);
});

app.route('/status').get((request, response) => {
    response.json(eventStatusObj);
});

app.route('/managers').get((request, response) => {
    response.json(managersObj);
});

app.route('/locations').get((request, response) => {
    response.json(locationsObj);
});

app.route('/clients').get((request, response) => {
    response.json(clientObj);
});

app.use("/events", eventRouter);
app.use("/equip", equipRouter);
app.use("/login", userRouter);



function readCalendars() {

    dbConn.query('SELECT * FROM t_warehouses', (err, result) => {
        if (err) {
            console.log('Error while fetching events', err);
        } else {
            console.log('Calendars fetched successfully');
            calendarsObj = result;
            console.log(calendarsObj);
        }
    })
}

function readEventStatus() {

    dbConn.query('SELECT * FROM t_event_status', (err, result) => {
        if (err) {
            console.log('Error while fetching events', err);
        } else {
            console.log('Event status fetched successfully');
            eventStatusObj = result;
            console.log(eventStatusObj);
        }
    })
}

function readManagers() {
    dbConn.query('SELECT * FROM v_managers', (err, result) => {
        if (err) {
            console.log('Error while fetching managers', err);
        } else {
            console.log('Managers fetched successfully');
            managersObj = result;
            console.log(managersObj);
        }
    })
}

function readLocations() {
    dbConn.query('SELECT * FROM v_event_location', (err, result) => {
        if (err) {
            console.log('Error while fetching locations', err);
        } else {
            console.log('Locations fetched successfully');
            locationsObj = result;
            console.log(locationsObj);
        }
    })
}

function readClients() {
    dbConn.query('SELECT * FROM t_clients', (err, result) => {
        if (err) {
            console.log('Error while fetching clients', err);
        } else {
            console.log('Clients fetched successfully');
            clientObj = result;
            console.log(clientObj);
        }
    })
}


//          S E R V E R
// --------------------------------------------------------------------
app.listen();