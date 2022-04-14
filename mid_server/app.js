"use strict";

const express = require("express");
const mysql = require("mysql2");
const app = express();
let config = require('./config.js');
const cors = require("cors");



const PORT = 3080;
let equipmentObj = {};
let eventsObj = {};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: false });

// ====================================================================
//            Routing
// ====================================================================

app.get('/', function (req, res) {
    res.send('<h2>my mid_server is running</h2>');
});

//  GET equipment
// --------------------------------------------------------------------
app.get("/equipment", function (request, response) {
    getEquipment(response);

});



//          F U N C T I O N S
// --------------------------------------------------------------------
function getEquipment(response) {

    let connection = mysql.createConnection(config);
    connection.execute("SELECT * FROM t_equipment",
        function (err, results, fields) {
            if (err) {
                console.log('Check SSH tunnel!')
                return console.log("Error: " + err.message);
            }
            console.log('results:', results);            
            response.json(results);
            equipmentObj = results;

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