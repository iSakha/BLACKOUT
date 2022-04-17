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
app.route('/').get( (request, response) => {
    res.send('<h2>my mid_server is running</h2>');
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