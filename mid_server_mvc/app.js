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
let clientObj;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: false });


// readCalendars();
// readEventStatus();
// readManagers();
// readLocations();
// readClients();


app.route('/').get((request, response) => {
    response.send('<h2>my mid_server_MVC is running</h2>');
});

//  READ calendars (cities)
// --------------------------------------------------------------------
app.route('/cities').get((request, response) => {
    response.json(calendarsObj);
});

//  GET all events
// --------------------------------------------------------------------
app.route('/events').get((request, response) => {
    getAllEvents(response);
    // response.json({
    //     "result": "OK"
    //     });
});

//  READ Event status
// --------------------------------------------------------------------
app.route('/status').get((request, response) => {
    response.json(eventStatusObj);
});

//  GET event phases
// --------------------------------------------------------------------
app.route('/phases').get((request, response) => {
    getPhases(response);
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

//  READ clients
// --------------------------------------------------------------------
app.route('/clients').get((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "PUT,GET,DELETE,PATCH");
    response.setHeader("Access-Control-Allow-Credentials", true);
    response.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type,Origin,Accept,Authorization"
    );
    response.json(clientObj);
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
    // response.send(request.body);
});

//  UPDATE Equipment (transfer between warehouses)
// --------------------------------------------------------------------
app.patch("/equip/transfer", urlencodedParser, function (request, response) {
    if (!request.body) return response.status(400);
    console.log("request.body", request.body);
    return transferEquipment(request.body, response);
    // response.send(request.body);
});

//  GET event phases
// --------------------------------------------------------------------


//          F U N C T I O N S
// --------------------------------------------------------------------

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

//  UPDATE Equipment (transfer between warehouses) function
// --------------------------------------------------------------------
function transferEquipment(data, response) {
    console.log("data to update: ", data);
    let dataArray = [];

    for (let i = 0; i < data.length; i++) {
        dataArray = [data[i].qty_minsk, data[i].qty_msc, data[i].qty_kazan, data[i].qty_piter, data[i].fixture_type];
        console.log("dataArray to update: ", dataArray);
        const sql = "UPDATE t_equip_name_qty SET qty_minsk=?, qty_msc=?, qty_kazan=?, qty_piter=? WHERE fixture_type=?";
        dbConn.query(sql, dataArray, (err, result) => {
            if (err) {
                console.log('Error while fetching locations', err);
                response.send({ "result": "error" });
            } else {
                console.log('Locations fetched successfully');

            }

        })
    };
    response.send({ "result": "success" });
}


function getAllEvents(response) {
    let sendingObject = [];
    let eventObj = [];
    dbConn.query('SELECT * FROM v_events', (err, res) => {
        if (err) {
            console.log('Error while fetching events', err);
        } else {
            eventObj = res;
            // console.log(eventObj);

            const uniques = eventObj.map(
                (obj) => {
                    return obj.id
                }
            ).filter(
                (item, index, arr) => {
                    return arr.indexOf(item) == index
                }
            );

            console.log("uniques:", uniques);

            

            for (let i = 0; i < uniques.length; i++) {
                let phase = [];
                // filter by id
                // =======================================
                let eventObjId = eventObj.filter((p) => {
                    return p.id == uniques[i];
                })

                let distinctEventObj = getUniqueListBy(eventObjId, 'id');

                console.log("distinctEventObj-" + i, distinctEventObj);

                console.log("eventObjId-" + i, eventObjId);

                console.log("length-" + i, eventObjId.length);

                for (let j = 0; j < eventObjId.length; j++) {

                    let ph = {};
                    ph.id = j + 1;
                    ph.id_phase = eventObjId[j].id_phase;
                    ph.id_event = uniques[i]
                    ph.phase_title = eventObjId[j].phase_title;
                    ph.phase_start = eventObjId[j].phase_start;
                    ph.phase_end = eventObjId[j].phase_end;

                    phase.push(ph);

                }
                let so = {};
                so = distinctEventObj[0];
                so.phase = phase;


                sendingObject.push(so);


                console.log("phase-" + i, phase)

            }

            console.log("sendingObject", sendingObject)

        }

        // const arr1 = getUniqueListBy(eventObj, 'id')
        // console.log("eventObj:", eventObj);
        response.json(sendingObject);


    })
}

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

// function getPhases(eventObj) {
//     let myEvent = [];
//     let phaseObj = [];
//     let id = eventObj.id;
//     dbConn.query('SELECT * FROM v_event_details WHERE id_event=' + id, (err, res) => {
//         if (err) {
//             console.log('Error while fetching events phases', err);
//         } else {
//             console.log('Events phasesfetched successfully');
//             console.log("phases: ", res);
//             phaseObj = res;
//         }
//         console.log("phaseObj: ", phaseObj);
//     })
//     response.json(eventObj);
// }

// const data = [{
//     "Name": "Adobe Systems Incorporated",
//     "Sector": "Technology",
//     "Market": "NASDAQ"
//   }, {
//     "Name": "American River Bankshares",
//     "Sector": "Finance",
//     "Market": "NASDAQ"
//   }, {
//     "Name": "iStar Financial Inc.",
//     "Sector": "n/a",
//     "Market": "NYSE"
//   }, {
//     "Name": "Prothena Corporation plc",
//     "Sector": "Health Care",
//     "Market": "NASDAQ"
//   }, {
//     "Name": "Matrix Service Company",
//     "Sector": "Basic Industries",
//     "Market": "NASDAQ"
//   }];

//   console.log("data:",data);

//   const uniques = data.map(
//     (obj) => {
//       return obj.Market
//     }
//   ).filter(
//     (item, index, arr) => {
//       return arr.indexOf(item) == index
//     }
//   );

//   console.log("uniques:",uniques);

const userScores = {
    chemistry: 60,
    mathematics: 70,
    physics: 80,
    english: 98
};

const names = Object.keys(userScores);
console.log(names);


//          S E R V E R
// --------------------------------------------------------------------
app.listen(PORT, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("listening on port", PORT);
});