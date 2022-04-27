const mysql = require("mysql2");
let config = require('../config/config.js');
const equipModel = require('../models/equipModel.js');

// get all equipment list
exports.getEquipment = (req, res)=> {
    //console.log('here all employees list');
    equipModel.getEquipment((err, equip) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('Equipment', equip);
        res.send(equip)
    })
}