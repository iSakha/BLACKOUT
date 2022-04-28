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

// get all departments
exports.getDepartment = (req, res)=> {
    equipModel.getDepartment((err, equip) =>{
        if(err)
        res.send(err);
        console.log('Department', equip);
        res.send(equip)
    })
}

// get all categories
exports.getCategories = (req, res)=> {
    equipModel.getCategories((err, equip) =>{
        if(err)
        res.send(err);
        console.log('Categories', equip);
        res.send(equip)
    })
}

// get categories by dep
exports.getCategoriesByDep = (req, res)=> {
    equipModel.getCategoriesByDep(req.params.dep_id, (err, equip)=>{
        if(err)
        res.send(err);
        console.log('Categories by department',equip);
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
    equipModel.getEquipmentByDepAndCat(req.params.dep_id, req.params.cat_id, (err, equip)=>{
        if(err)
        res.send(err);
        console.log('Equipment by department and category',equip);
        res.send(equip)
    })
}

// get equipment by dep cat and fixture type
exports.getEquipmentByDepCatFType = (req, res)=> {
    equipModel.getEquipmentByDepCatFType(req.params.dep_id, req.params.cat_id, req.params.ftype_id, (err, equip)=>{
        if(err)
        res.send(err);
        console.log('Equipment by department,category and fixture type',equip);
        res.send(equip)
    })
}