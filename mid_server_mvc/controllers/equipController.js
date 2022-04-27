const mysql = require("mysql2");
let config = require('../config/config.js');
const equipModel = require('../models/equipModel.js');

// get all equipment list
exports.getEquipment = (req, res)=> {
    equipModel.getEquipment((err, equip) =>{
        if(err)
        res.send(err);
        console.log('Equipment', equip);
        res.send(equip)
    })
}

// get equipment by dep
exports.getEquipmentByDep = (req, res)=> {
    equipModel.getEquipmentByDep(req.params.dep_id, (err, equip)=>{
        if(err)
        res.send(err);
        console.log('Equipment by department',equip);
        res.send(equip)
    })
}

// get equipment by dep and cat
exports.getEquipmentByDepAndCat = (req, res)=> {
    equipModel.getEquipmentByDepAndCat((err, equip) =>{
        if(err)
        res.send(err);
        console.log('Equipment', equip);
        res.send(equip)
    })
}