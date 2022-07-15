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

    static getFixtureByID(id){

        let idDep = id.slice(0,3);
        let idCat = id.slice(4,7);
        let idName = id.slice(8,11);
        console.log("idDep:",idDep);
        console.log("idCat:",idCat);
        console.log("idName:",idName);
        try {
            return db.execute('SELECT * FROM `t_equipment` WHERE idDep=? AND idCat=? AND idName=?', [idDep, idCat, idName]);
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
            // return db.execute('SELECT * FROM `t_equipment` WHERE idDep=? AND idCat=? AND idName=?', [idDep, idCat, idName]);
            
        } catch (error) {
            return error;
        }
    }

}