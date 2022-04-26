"use strict";

const express = require("express");
const mysql = require("mysql2");
const app = express();
// let config = require('./config/config.js');
const cors = require("cors");

const eventRouter = require("./routes/eventRouter.js");



const PORT = 3070;

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


// readCalendars();

// ====================================================================
//            Routing
// ====================================================================
app.route('/').get( (request, response) => {
    response.send('<h2>my mid_server_MVC is running</h2>');
});

//  READ calendars
// --------------------------------------------------------------------
    app.route('/calendars').get((request, response) => {
    response.json(calendarsObj)
});

app.use("/events", eventRouter);

//  CREATE event
// --------------------------------------------------------------------
// app.route("/events").post(urlencodedParser,(request, response) => {
//     if (!request.body) return response.sendStatus(400);
//     // console.log("post.request.body", request.body);
//     return createEvent(request.body, response)
// });

//  DELETE event
// --------------------------------------------------------------------
// app.route("/events").delete(urlencodedParser,(request, response) => {
//     if (!request.body) return response.sendStatus(400);
//     // console.log("delete.request.body", request.body);
//     return deleteEvent(request.body, response);
//     // response.send(request.body);
// });

// app.route("/events/:id").delete(urlencodedParser,(request, response) => {
//     if (!request.body) return response.sendStatus(400);
//     const eventId = request.params['id'];
//     // console.log("delete.request.body", request.body);
//     return deleteEvent(eventId, response);
//     // response.send(request.body);
// });

//  UPDATE event
// --------------------------------------------------------------------
// app.route("/events").put(urlencodedParser, (request, response) => {
//     if (!request.body) return response.sendStatus(400);
//     // console.log("update.request.body", request.body);
//     return updateEvent(request.body, response);
//     // response.send(request.body);
// });

//  READ events SUMMARY
// --------------------------------------------------------------------
app.route("/events/summary").get((request, response) => {
    readEventsSummary(response);
});

//  GET equipment
// --------------------------------------------------------------------
app.route('/equip/dep').get( (request, response) => {
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
    getEquipmentCat(catId, response);
    // response.send(request.body);
});

app.route('/equip/cat').get((request, response) => {
    getListCategories(response);
});

app.route('/equip/fxt').post((request, response) => {
    getListFixtures(request.body, response);
});

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

// function readCalendars() {
//     let connection = mysql.createConnection(config);
//     connection.execute("SELECT * FROM `t_calendars`",
//         function (err, results, fields) {
//             if (err) {
//                 console.log('Check SSH tunnel!')
//                 return console.log("Error: " + err.message);
//             }

//             calendarsObj = results;
//             calendarsArray = [];
//             calendarsArrId = [];
//             for (let i = 0; i < calendarsObj.length; i++) {
//                 calendarsArray.push(calendarsObj[i].cal_name);
//                 calendarsArrId.push(calendarsObj[i].id);
//             }

//             console.log('calendars array:', calendarsArray);
//             console.log('calendarsID array:', calendarsArrId);

//             connection.end();
//         });
// }

// function readEvents(response) {
//     let connection = mysql.createConnection(config);
//     connection.execute("SELECT * FROM v_events",
//         function (err, results, fields) {
//             if (err) {
//                 console.log('Check SSH tunnel!')
//                 return console.log("Error: " + err.message);
//             }
//             eventsObj = results;
//             console.log(eventsObj);
//             response.send(eventsObj);
//             connection.end();
//         });
// }

// function createEvent(data, response) {
//     let connection = mysql.createConnection(config);
//     let dateStartObj = new Date(data.start);
//     let dateEndObj = new Date(data.end);

//     console.log("data.start:", dateStartObj);
    
//     let dataArray = [data.calendarId, data.title, dateStartObj, dateEndObj, data.location];
//     console.log("dataArray", dataArray);
    
//     const sql = "INSERT INTO t_events(calendarId, title, start, end, location) VALUES(?, ?, ?, ?, ?)";
//     connection.query(sql, dataArray, function (err, results) {
//         if (err) return console.log(err);
//         readEvents(response);
//     });
// }

// function deleteEvent(eventId, response) {
//     let connection = mysql.createConnection(config);
//     console.log("eventId", eventId);
//     // execute will internally call prepare and query
//     connection.execute(
//         "DELETE FROM `t_events` WHERE `id` = ?",
//         [eventId],
//         function (err, results, fields) {
//             if (err) return console.log(err);
//             readEvents(response);
//             console.log(results); // results contains rows returned by server
//         }
//     )
// }

// function updateEvent(data, response) {
//     let connection = mysql.createConnection(config);
//     let dateStartObj = new Date(data.start);
//     let dateEndObj = new Date(data.end);

//     console.log("data.start:", dateStartObj);
    
//     let dataArray = [data.calendarId, data.title, dateStartObj, dateEndObj, data.location, data.id];
//     console.log("dataArray", dataArray);
    
//     const sql = "UPDATE t_events SET calendarId=?, title=?, start=?, end=?, location=? WHERE id=?";
//     connection.query(sql, dataArray, function (err, results) {
//         if (err) return console.log(err);
//         readEvents(response);
//     });
// }

// function readEventsSummary(response) {
//     let connection = mysql.createConnection(config);
//     connection.execute("SELECT * FROM v_events_summary",
//         function (err, results, fields) {
//             if (err) {
//                 console.log('Check SSH tunnel!')
//                 return console.log("Error: " + err.message);
//             }
//             response.send(results);
//             connection.end();
//         });
// }

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