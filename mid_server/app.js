"use strict";

const express = require("express");
const mysql = require("mysql2");
const app = express();
let config = require('./config.js');
const cors = require("cors");



const PORT = 3080;

let equipmentObj = {};
let eventsObj = {};

let calendarsObj;
let calendarsArray;
let calendarsArrId;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: false });


readCalendars();

// ====================================================================
//            Routing
// ====================================================================
app.route('/').get( (request, response) => {
    res.send('<h2>my mid_server is running</h2>');
});

//  READ calendars
// --------------------------------------------------------------------
    app.route('/calendars').get((request, response) => {
    response.json(calendarsObj)
});

//  READ events
// --------------------------------------------------------------------
app.route("/events").get((request, response) => {
    readEvents(response);
});

//  CREATE event
// --------------------------------------------------------------------
app.post("/events", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log("post.request.body", request.body);
    // readEvents(response);
    return createEvent(request.body, response)
    // response.send(request.body);
});

//  DELETE event
// --------------------------------------------------------------------
app.delete("/events", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log("delete.request.body", request.body);
    return deleteEvent(request.body, response);
    // response.send(request.body);
});

//  GET equipment
// --------------------------------------------------------------------
app.route('/equip/dep').get( (request, response) => {
    // getEquipment(response);
    console.log('get/equip');
    getListDepartmets(response);
});

app.route('/equip/dep/:id').get((request, response) => {
    const depId = request.params['id'];
    getEquipmentDep(depId, response);
    // response.send(request.body);
});

app.route('/equip/cat/:id').get((request, response) => {
    const catId = request.params['id'];
    // console.log('get/equip');
    getEquipmentCat(catId, response);
    // response.send(request.body);
});

app.route('/equip/cat').get((request, response) => {
// app.get("/equip/cat", function (request, response) {
    // getEquipment(response);
    // console.log('get/equip');
    getListCategories(response);
});
app.route('/equip/fxt').post((request, response) => {
// app.post("/equip/fxt", function (request, response) {
    getListFixtures(request.body, response);
});



//          F U N C T I O N S
// --------------------------------------------------------------------

function readCalendars() {
    let connection = mysql.createConnection(config);
    connection.execute("SELECT * FROM `t_calendars`",
        function (err, results, fields) {
            if (err) {
                console.log('Check SSH tunnel!')
                return console.log("Error: " + err.message);
            }

            calendarsObj = results;
            calendarsArray = [];
            calendarsArrId = [];
            for (let i = 0; i < calendarsObj.length; i++) {
                calendarsArray.push(calendarsObj[i].cal_name);
                calendarsArrId.push(calendarsObj[i].id);
            }

            console.log('calendars array:', calendarsArray);
            console.log('calendarsID array:', calendarsArrId);

            connection.end();
        });
}

function readEvents(response) {
    let connection = mysql.createConnection(config);
    connection.execute("SELECT * FROM v_events",
        function (err, results, fields) {
            if (err) {
                console.log('Check SSH tunnel!')
                return console.log("Error: " + err.message);
            }
            eventsObj = results;
            console.log(eventsObj);
            response.send(eventsObj);
            connection.end();
        });
}

function createEvent(data, response) {
    let connection = mysql.createConnection(config);
    let dateStartObj = new Date(data.start);
    let dateEndObj = new Date(data.end);

    console.log("data.start:", dateStartObj);
    
    let dataArray = [data.calendarId, data.title, dateStartObj, dateEndObj, data.location];
    console.log("dataArray", dataArray);
    
    const sql = "INSERT INTO t_events(calendarId, title, start, end, location) VALUES(?, ?, ?, ?, ?)";
    connection.query(sql, dataArray, function (err, results) {
        if (err) return console.log(err);
        readEvents(response);
    });
}

function deleteEvent(data, response) {
    let connection = mysql.createConnection(config);
    console.log("data.id", data.id);
    // execute will internally call prepare and query
    connection.execute(
        "DELETE FROM `t_events` WHERE `id` = ?",
        [data.id],
        function (err, results, fields) {
            if (err) return console.log(err);
            readEvents(response);
            console.log(results); // results contains rows returned by server
        }
    )
}

function getEquipmentDep(depId, response) {
    let data = [];
    data.push(depId)
    let connection = mysql.createConnection(config);
    connection.execute("SELECT * FROM v_cat_model_name WHERE department=?",
        data,
        function (err, results, fields) {
            if (err) {
                console.log('Check SSH tunnel!')
                return console.log("Error: " + err.message);
            }
            console.log('results:', results);
            response.json(results);
            // equipmentObj = results;

            connection.end();
        });
}

function getEquipmentCat(catId, response) {
    let data = [];
    data.push(catId);
    let connection = mysql.createConnection(config);
    connection.execute("SELECT * FROM v_cat_model_name WHERE category=?",
        data,
        function (err, results, fields) {
            if (err) {
                console.log('Check SSH tunnel!')
                return console.log("Error: " + err.message);
            }
            console.log('results:', results);
            response.json(results);
            // equipmentObj = results;
            connection.end();
        });
}

function getListDepartmets(response) {
    let connection = mysql.createConnection(config);
    connection.execute("SELECT * FROM `t_department`",
        function (err, results, fields) {
            if (err) {
                console.log('Check SSH tunnel!')
                return console.log("Error: " + err.message);
            }
            console.log('deps:', results);
            response.json(results);
            equipmentObj = results;

            connection.end();
        });
}

function getListCategories(response) {
    let connection = mysql.createConnection(config);
    connection.execute("SELECT * FROM `t_category`",
        function (err, results, fields) {
            if (err) {
                console.log('Check SSH tunnel!')
                return console.log("Error: " + err.message);
            }
            console.log('deps:', results);
            response.json(results);
            equipmentObj = results;

            connection.end();
        });
}

function getListFixtures(cat, response) {
    let connection = mysql.createConnection(config);
    let data = [];
    data.push(cat.id);
    console.log("data:", data);
    const sql = "SELECT * FROM `v_cat_model_name` WHERE category=?";
    connection.query(sql, data,
        function (err, results, fields) {
            if (err) {
                console.log('Check SSH tunnel!')
                return console.log("Error: " + err.message);
            }
            console.log('fxt:', results);
            response.json(results);
            console.log("cat", cat);
            connection.end();
        });
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