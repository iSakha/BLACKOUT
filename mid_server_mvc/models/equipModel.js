let dbConn = require('../config/config.js');

let Equip = function (equip) {

    this.department = equip.department;
    this.category = equip.category;
    this.fixture_type = equip.fixture_type;
    this.fixture_id = equip.fixture_id;
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
    dbConn.query('SELECT * FROM t_equipment_c', (err, res)=>{
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
    dbConn.query('SELECT * FROM t_category_c', (err, res)=>{
        if(err){
            console.log('Error while fetching categories', err);
            result(null,err);
        }else{
            console.log('Categories fetched successfully');
            result(null,res);
        }
    })
}

// get categories by dep
Equip.getCategoriesByDep = (id, result)=>{
    dbConn.query('SELECT * FROM t_category_c WHERE dep_id=?', id, (err, res)=>{
        if(err){
            console.log('Error while fetching categories by dep', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

// get equipment by dep
Equip.getEquipmentByDep = (id, result)=>{
    dbConn.query('SELECT * FROM t_equipment_c WHERE department=?', id, (err, res)=>{
        if(err){
            console.log('Error while fetching equipment by dep', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

// get equipment by dep and cat
Equip.getEquipmentByDepAndCat = (id_dep, id_cat, result) =>{
    let dataArray = [id_dep, id_cat];
    const sql = "SELECT * FROM t_equipment_c WHERE department=? AND category=?";
    dbConn.query(sql, dataArray, (err, res)=>{
        if(err){
            console.log('Error while updating the event');
            result(null, err);
        }else{
            console.log("Event updated successfully");
            result(null, res);
        }
    });
}

// get equipment by dep, cat and fixture type
Equip.getEquipmentByDepCatFType = (id_dep, id_cat, id_ftype, result) =>{
    let dataArray = [id_dep, id_cat, id_ftype];
    const sql = "SELECT * FROM t_equipment_c WHERE department=? AND category=? AND fixture_type=?";
    dbConn.query(sql, dataArray, (err, res)=>{
        if(err){
            console.log('Error while getting equipment');
            result(null, err);
        }else{
            console.log("Equipment got successfully");
            result(null, res);
        }
    });
}



module.exports = Equip;