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


}