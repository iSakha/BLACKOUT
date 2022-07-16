const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");

const dbConn = require('../config/config.js');

const PORT = 3075;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: false });

app.route('/').get((request, response) => {
    response.send('<h2>my TEST server is running</h2>');
});

//  GET all events
// --------------------------------------------------------------------
app.route('/events').get((request, response) => {
    getAllEvents(response);
    // response.json({ "result": "OK" });
});

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


//          S E R V E R
// --------------------------------------------------------------------
app.listen(PORT, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("TESTserver listening on port", PORT);
});