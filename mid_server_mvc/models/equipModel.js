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
Equip.getEquipment = (result) => {
    dbConn.query('SELECT * FROM t_equip_name_qty ORDER BY fixture_type', (err, res) => {
        if (err) {
            console.log('Error while fetching equipment', err);
            result(null, err);
        } else {
            console.log('Equipment fetched successfully');
            result(null, res);
        }
    })
}

// get all departments
Equip.getDepartment = (result) => {
    dbConn.query('SELECT * FROM t_department', (err, res) => {
        if (err) {
            console.log('Error while fetching department', err);
            result(null, err);
        } else {
            console.log('Department fetched successfully');
            result(null, res);
        }
    })
}

// get all categories
Equip.getCategories = (result) => {
    dbConn.query('SELECT * FROM t_category_c', (err, res) => {
        if (err) {
            console.log('Error while fetching categories', err);
            result(null, err);
        } else {
            console.log('Categories fetched successfully');
            result(null, res);
        }
    })
}

// get categories by dep
Equip.getCategoriesByDep = (id, result) => {
    dbConn.query('SELECT * FROM t_category WHERE dep_id=?', id, (err, res) => {
        if (err) {
            console.log('Error while fetching categories by dep', err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

// get equipment by dep
Equip.getEquipmentByDep = (id, result) => {
    dbConn.query('SELECT * FROM t_equip_name_qty WHERE LEFT(fixture_type, 3)=? ORDER BY fixture_type', id, (err, res) => {
        if (err) {
            console.log('Error while fetching equipment by dep', err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

// get equipment by dep and cat
Equip.getEquipmentByDepAndCat = (id_dep, id_cat, result) => {
    let dataArray = [id_dep, id_cat];
    const sql = "SELECT * FROM t_equip_name_qty WHERE LEFT(fixture_type, 3)=? AND SUBSTR(`fixture_type`, 5, 3)=?";
    dbConn.query(sql, dataArray, (err, res) => {
        if (err) {
            console.log('Error while updating the event');
            result(null, err);
        } else {
            console.log("Equipment by dep and cat got successfully");
            result(null, res);
        }
    });
}

// get equipment by dep, cat and fixture type
Equip.getEquipmentByDepCatFType = (id_dep, id_cat, id_ftype, result) => {
    let dataArray = [id_dep, id_cat, id_ftype];
    const sql = "SELECT * FROM t_equipment_c WHERE department=? AND category=? AND fixture_type=?";
    dbConn.query(sql, dataArray, (err, res) => {
        if (err) {
            console.log('Error while getting equipment');
            result(null, err);
        } else {
            console.log("Equipment got successfully", res);
            result(null, res);
        }
    });
}


// write transferring equipment to DB
// Equip.getEquipmentByDepCatFType = (data, result) => {
//     let dataArray = [];
//     console.log("data:", data);

//     for (let i = 0; i < data.length; i++) {
//         dataArray = [data[i].qty_minsk, data[i].qty_msc, data[i].qty_kazan, data[i].qty_piter, data[i].fixture_type];
//         const sql = "UPDATE t_equip_name_qty SET qty_minsk=?, qty_msc=?, qty_kazan=?, qty_piter=? WHERE fixture_type=?";
//         dbConn.query(sql, dataArray, (err, res) => {
//             if (err) {
//                 console.log('Error while transferring equipment');
//                 result(null, err);
//             } else {
//                 console.log("Equipment transfered successfully");
//                 // result(null, res);
//             }
//         });
//     }

    
// }



module.exports = Equip;