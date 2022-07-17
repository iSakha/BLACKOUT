const dtb = require('../config/database');
const db = dtb.promise();

module.exports = class Equipment {

    constructor() {

    }

    static getDepartments() {
        try {
            return db.execute('SELECT * FROM `t_department`');
        } catch (error) {
            return error;
        }
    }

    static getCategories() {
        try {
            return db.execute('SELECT * FROM `t_category`');
        } catch (error) {
            return error;
        }
    }

    static getCategoriesByDep(idDep) {
        console.log("idDep:", idDep)
        try {
            return db.execute('SELECT * FROM `t_category` WHERE idDep=?', [idDep]);
        } catch (error) {
            return error;
        }
    }

    static getEquipmentByDep(idDep) {
        console.log("idDep:", idDep)
        try {
            return db.execute('SELECT * FROM `t_equip_name` WHERE idDep=?', [idDep]);
        } catch (error) {
            return error;
        }
    }

    static getEquipmentByDepCat(idDep, idCat) {
        console.log("idDep:", idDep);
        console.log("idCat:", idCat);
        try {
            return db.execute('SELECT * FROM `t_equip_name` WHERE idDep=? AND idCat=?', [idDep, idCat]);
        } catch (error) {
            return error;
        }
    }

    static getFixturesByModelName(id) {

        id = id + ".___";

        try {
            return db.execute('SELECT * FROM `t_equipment` WHERE idFixture LIKE ?', [id]);
        } catch (error) {
            return error;
        }
    }

    static getFixtureByDepCatName(idDep, idCat, idName) {
        console.log("idDep:", idDep);
        console.log("idCat:", idCat);
        console.log("idName:", idName);
        try {
            return db.execute('SELECT * FROM `t_equipment` WHERE idDep=? AND idCat=? AND idName=?', [idDep, idCat, idName]);
        } catch (error) {
            return error;
        }
    }

    static getQtyById(id) {
        try {
            return db.execute('SELECT * FROM `v_qty` WHERE id=?', [id]);
        } catch (error) {
            return error;
        }
    }

    static writeToHistory(row) {
        try {
            return db.execute('INSERT INTO `t_repair_history` (idFixture, idAction, comments, spareParts, date, idUser, unixTime, idEvent) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', row);
        } catch (error) {
            return error;
        }
    }

    static changeStatusById(idStatus, idFixture) {
        try {
            return db.execute('UPDATE `t_equipment` SET `idFixtureState`=? WHERE `idFixture`=?', [idStatus, idFixture]);
        } catch (error) {
            return error;
        }
    }

    static getFixtureHistory() {
        try {
            return db.execute('SELECT * FROM `v_repair_history`');
        } catch (error) {
            return error;
        }
    }

    static getFixtureHistoryByID(id) {
        try {
            return db.execute('SELECT * FROM `v_repair_history` WHERE idFixture=? ', [id]);
        } catch (error) {
            return error;
        }
    }

    static fixturesMovement(idWarehouse, idFixture) {



        try {
            // return db.query('UPDATE `t_equipment` SET idWarehouse=? WHERE idFixture=? ', [idWarehouse,idFixture]); 

            console.log("idWarehouse_fm:", idWarehouse);
            console.log("idFixture_fm:", idFixture);

            let idW = idWarehouse;

            let idF_1 = idFixture[0];
            let idF_2 = idFixture[1];
            let idF_3 = idFixture[2];
            let idF_4 = idFixture[3];

            let query_1 = "UPDATE t_equipment SET idWarehouse = CASE ";
            let query_2 = "";
            let query_4 = "";

            for (let i = 0; i < idFixture.length; i++) {
                query_2 += " WHEN idFixture = '" + idFixture[i] + "' THEN " + idW;
                if (i < idFixture.length - 1) {
                    query_4 += "'" + idFixture[i] + "'" + ",";
                } else query_4 += "'" + idFixture[i] + "'";

            }

            let query_3 = " END  WHERE idFixture IN ("

            let q = query_1 + query_2 + query_3 + query_4 + ")";

            console.log(q);

            let query = query_1 + query_2 + " END  WHERE idFixture IN ('" + idFixture[0] + "','" + idFixture[1] + "','" + idFixture[2] + "','" + idFixture[3] + "')"
            return db.query(q);
        } catch (error) {
            return error;
        }
    }

    // static fixturesMovement() {
    //     try {

    //         var values = [
    //             { idWarehouse: 3, idFixture: '001.001.001.103' },
    //             { idWarehouse: 3, idFixture: '001.001.001.104' }
    //           ];

    //           var queries = '';

    //           values.forEach(function (item) {
    //             queries += mysql.format("UPDATE `t_equipment` SET idWarehouse = ? WHERE idFixture = ?; ", item);
    //           });
    //            db.query(queries, defered.makeNodeResolver());

    //         // return db.query('UPDATE `t_equipment` SET idWarehouse=? WHERE idFixture=? ', [idWarehouse,idFixture]);            
    //         // return db.query("UPDATE t_equipment SET idWarehouse = CASE 	WHEN idFixture = '001.001.001.103' THEN 1 WHEN idFixture = '001.001.001.104' THEN 1 WHEN idFixture = '001.001.001.105' THEN 1 WHEN idFixture = '001.001.001.106' THEN 1 END  WHERE idFixture IN ('001.001.001.103','001.001.001.104','001.001.001.105','001.001.001.106')");            
    //     } catch (error) {
    //         return error;
    //     }
    // }


}