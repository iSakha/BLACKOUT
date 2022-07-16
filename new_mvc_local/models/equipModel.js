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
        console.log("idDep:",idDep)
        try {
            return db.execute('SELECT * FROM `t_category` WHERE idDep=?', [idDep]);
        } catch (error) {
            return error;
        }
    }

    static getEquipmentByDep(idDep) {
        console.log("idDep:",idDep)
        try {
            return db.execute('SELECT * FROM `t_equip_name` WHERE idDep=?', [idDep]);
        } catch (error) {
            return error;
        }
    }

    static getEquipmentByDepCat(idDep, idCat) {
        console.log("idDep:",idDep);
        console.log("idCat:",idCat);
        try {
            return db.execute('SELECT * FROM `t_equip_name` WHERE idDep=? AND idCat=?', [idDep, idCat]);
        } catch (error) {
            return error;
        }
    }

    static getFixturesByModelName(id){

        id = id + ".___";

        try {
            return db.execute('SELECT * FROM `t_equipment` WHERE idFixture LIKE ?', [id]);
        } catch (error) {
            return error;
        }
    }

    static getFixtureByDepCatName(idDep, idCat, idName){
        console.log("idDep:",idDep);
        console.log("idCat:",idCat);
        console.log("idName:",idName);
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

    static changeStatusById(idStatus,idFixture) {
        try {
            return db.execute('UPDATE `t_equipment` SET `idFixtureState`=? WHERE `idFixture`=?', [idStatus,idFixture]);            
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

}