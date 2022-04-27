let dbConn = require('../config/config.js');

let Equip = function (equip) {

    this.department = equip.department;
    this.category = equip.category;
    this.fixture_type = equip.fixture_type;
    this.equip_id = equip.equip_id;
    this.uid_cloudio = equip.uid_cloudio;
    this.manufactor = equip.manufactor;
    this.model_name = equip.model_name;
    this.s_number = equip.s_number;
    this.wh_code = equip.wh_code;
    this.const_location = equip.const_location;
    this.current_location = equip.current_location;
    this.status = equip.status;
    this.state = equip.state;

}

// get all equipment
Equip.getEquipment = (result) =>{
    dbConn.query('SELECT * FROM t_equipment', (err, res)=>{
        if(err){
            console.log('Error while fetching equipment', err);
            result(null,err);
        }else{
            console.log('Equipment fetched successfully');
            result(null,res);
        }
    })
}

// get all departments
Equip.getDepartment = (result) =>{
    dbConn.query('SELECT * FROM t_department', (err, res)=>{
        if(err){
            console.log('Error while fetching department', err);
            result(null,err);
        }else{
            console.log('Department fetched successfully');
            result(null,res);
        }
    })
}

// get all categories
Equip.getCategories = (result) =>{
    dbConn.query('SELECT * FROM t_category', (err, res)=>{
        if(err){
            console.log('Error while fetching categories', err);
            result(null,err);
        }else{
            console.log('Categories fetched successfully');
            result(null,res);
        }
    })
}

// get equipment by dep
Equip.getEquipmentByDep = (id, result)=>{
    dbConn.query('SELECT * FROM t_equipment WHERE department=?', id, (err, res)=>{
        if(err){
            console.log('Error while fetching equipment by dep', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

// get equipment by dep and cat
Equip.getEquipmentByDepAndCat = (result) =>{
    dbConn.query('SELECT * FROM t_equipment', (err, res)=>{
        if(err){
            console.log('Error while fetching equipment', err);
            result(null,err);
        }else{
            console.log('Equipment fetched successfully');
            result(null,res);
        }
    })
}






module.exports = Equip;