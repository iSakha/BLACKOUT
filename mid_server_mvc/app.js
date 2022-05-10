"use strict";

const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");

const dbConn = require('./config/config.js');

const eventRouter = require("./routes/eventRouter.js");
const equipRouter = require("./routes/equipRouter.js");
const userRouter = require("./routes/userRouter.js");


const PORT = 3070;

let equipmentObj = {};
let eventsObj = {};

let calendarsObj;
let eventStatusObj;
let managersObj;
let locationsObj;
let phaseObj;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: false });


readCalendars();
readEventStatus();
readManagers();
readLocations();
readPhases();


app.route('/').get( (request, response) => {
    response.send('<h2>my mid_server_MVC is running</h2>');
});

//  READ calendars (cities)
// --------------------------------------------------------------------
    app.route('/cities').get((request, response) => {
    response.json(calendarsObj);
});

//  READ Event status
// --------------------------------------------------------------------
app.route('/status').get((request, response) => {
    response.json(eventStatusObj);
});

//  READ Managers
// --------------------------------------------------------------------
app.route('/managers').get((request, response) => {
    response.json(managersObj);
});

//  READ Locations
// --------------------------------------------------------------------
app.route('/locations').get((request, response) => {
    response.json(locationsObj);
});

//  READ event phases
// --------------------------------------------------------------------
app.route('/phases').get((request, response) => {
    response.json(phaseObj);
});

// ====================================================================
//            Routing
// ====================================================================

app.use("/events", eventRouter);
app.use("/equip", equipRouter);
app.use("/login", userRouter);


//  GET selected equipment for the event
// --------------------------------------------------------------------
app.route('/equip/selected/:id').get((request, response) => {
    const eventId = request.params['id'];
    getEquipmentEvent(eventId, response);
    // response.send(request.body);
});

//  READ Equipment using time interval
// --------------------------------------------------------------------
app.post("/equipment", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log("request.body", request.body);
    return readEquipment(request.body, response);
    // response.send(request.body);
  });

  //  ADD Equipment to the Event
// --------------------------------------------------------------------
app.post("/equipment/event", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    // console.log("request.body", request.body);
    return addEquipmentToEvent(request.body, response);
    response.send(request.body);
  });

    //  UPDATE Equipment to the Event
// --------------------------------------------------------------------
app.patch("/equipment/event", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log("request.body", request.body);
    return updateEquipmentToEvent(request.body, response);
    // response.send(request.body);
  });

//          F U N C T I O N S
// --------------------------------------------------------------------

function readCalendars() {

    dbConn.query('SELECT * FROM t_calendars', (err, result)=>{
        if(err){
            console.log('Error while fetching events', err);
        }else{
            console.log('Calendars fetched successfully');
            calendarsObj = result;
            console.log(calendarsObj);
        }
    })
}

function readEventStatus() {

    dbConn.query('SELECT * FROM t_event_status', (err, result)=>{
        if(err){
            console.log('Error while fetching events', err);
        }else{
            console.log('Event status fetched successfully');
            eventStatusObj = result;
            console.log(eventStatusObj);
        }
    })
}

function readManagers() {
    dbConn.query('SELECT * FROM v_managers', (err, result)=>{
        if(err){
            console.log('Error while fetching managers', err);
        }else{
            console.log('Managers fetched successfully');
            managersObj = result;
            console.log(managersObj);
        }
    })
}

function readLocations() {
    dbConn.query('SELECT * FROM v_event_location', (err, result)=>{
        if(err){
            console.log('Error while fetching locations', err);
        }else{
            console.log('Locations fetched successfully');
            locationsObj = result;
            console.log(locationsObj);
        }
    })
}

function readPhases() {
    dbConn.query('SELECT * FROM t_event_phase', (err, result)=>{
        if(err){
            console.log('Error while fetching phases', err);
        }else{
            console.log('Phasess fetched successfully');
            phaseObj = result;
            console.log(phaseObj);
        }
    })
}
// function getEquipmentDep(depId, response) {
//     let data = [];
//     data.push(depId)
//     let connection = mysql.createConnection(config);
//     connection.execute("SELECT * FROM v_cat_model_name WHERE department=?",
//         data,
//         function (err, results, fields) {
//             if (err) {
//                 console.log('Check SSH tunnel!')
//                 return console.log("Error: " + err.message);
//             }
//             console.log('results:', results);
//             response.json(results);
//             // equipmentObj = results;

//             connection.end();
//         });
// }

// function getEquipmentCat(catId, response) {
//     let data = [];
//     data.push(catId);
//     let connection = mysql.createConnection(config);
//     connection.execute("SELECT * FROM v_cat_model_name WHERE category=?",
//         data,
//         function (err, results, fields) {
//             if (err) {
//                 console.log('Check SSH tunnel!')
//                 return console.log("Error: " + err.message);
//             }
//             console.log('results:', results);
//             response.json(results);
//             // equipmentObj = results;
//             connection.end();
//         });
// }

// function getListDepartmets(response) {
//     let connection = mysql.createConnection(config);
//     connection.execute("SELECT * FROM `t_department`",
//         function (err, results, fields) {
//             if (err) {
//                 console.log('Check SSH tunnel!')
//                 return console.log("Error: " + err.message);
//             }
//             console.log('deps:', results);
//             response.json(results);
//             equipmentObj = results;

//             connection.end();
//         });
// }

// function getListCategories(response) {
//     let connection = mysql.createConnection(config);
//     connection.execute("SELECT * FROM `t_category`",
//         function (err, results, fields) {
//             if (err) {
//                 console.log('Check SSH tunnel!')
//                 return console.log("Error: " + err.message);
//             }
//             console.log('deps:', results);
//             response.json(results);
//             equipmentObj = results;

//             connection.end();
//         });
// }

// function getListFixtures(cat, response) {
//     let connection = mysql.createConnection(config);
//     let data = [];
//     data.push(cat.id);
//     console.log("data:", data);
//     const sql = "SELECT * FROM `v_cat_model_name` WHERE category=?";
//     connection.query(sql, data,
//         function (err, results, fields) {
//             if (err) {
//                 console.log('Check SSH tunnel!')
//                 return console.log("Error: " + err.message);
//             }
//             console.log('fxt:', results);
//             response.json(results);
//             console.log("cat", cat);
//             connection.end();
//         });
// }

// function getEquipmentEvent(eventId, response) {
//     let data = [];
//     data.push(eventId)
//     let connection = mysql.createConnection(config);
//     connection.execute("SELECT * FROM v_event_fixtures WHERE event_id=?",
//         data,
//         function (err, results, fields) {
//             if (err) {
//                 console.log('Check SSH tunnel!')
//                 return console.log("Error: " + err.message);
//             }
//             console.log('results:', results);
//             response.json(results);
//             // equipmentObj = results;

//             connection.end();
//         });
// }

// //  READ Equipment using time interval function
// // --------------------------------------------------------------------
// function readEquipment(interval, response) {
//     let connection = mysql.createConnection(config);
//     // connection.execute("SELECT * FROM v_event_fixtures",
//     connection.execute("CALL equip_calculation(?,?)",
//       [interval.start, interval.end],
//       function (err, results, fields) {
//         if (err) {
//           console.log('Check SSH tunnel!')
//           return console.log("Error: " + err.message);
//         }
//         equipmentObj = results[0];
//         // console.log(fullEquipObj); // results contains rows returned by server
//         response.send(equipmentObj);
//         connection.end();
//       }
//     )
//   }

//   //  ADD Equipment to the Event function
// // --------------------------------------------------------------------
// function addEquipmentToEvent(data, response) {
//     console.log("data to add: ", data);
//     let dataArray = [];
//     let connection = mysql.createConnection(config);
//     for (let i = 0; i < data.length; i++) {    
//       dataArray.push([data[i].id_fxt, data[i].id_event, data[i].qty]);
//     }
  
//     console.log("dataArray to add: ", dataArray);
//     const sql = "INSERT INTO t_selected_fixtures(id_fxt, id_event, qty) VALUES ?";
//     connection.query(sql, [dataArray], function (err, results) {
//       if (err) return console.log(err);
//     });
//     response.send(data);
//     connection.end();
//   }

// //  UPDATE Equipment to the Event function
// // --------------------------------------------------------------------
// function updateEquipmentToEvent(data, response) {
//     console.log("data to update: ", data);
//     let dataArray = [];
//     let connection = mysql.createConnection(config);
//     for (let i = 0; i < data.length; i++) {
//       dataArray = [data[i].qty, data[i].id_event, data[i].id_fxt];
//       // console.log("dataArray to update: ", dataArray);
//       const sql = "UPDATE t_selected_fixtures SET qty=? WHERE id_event=? AND id_fxt=?";
//       connection.query(sql, dataArray, function (err, results) {
//         if (err) return console.log(err);
//       }
  
//       )
//     };
//     response.send(data);
//     connection.end();
//   }
  

//          S E R V E R
// --------------------------------------------------------------------
app.listen(PORT, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("listening on port", PORT);
});