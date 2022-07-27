const dtb = require('../config/database');
const db = dtb.promise();
const utils = require('../utils/utils');

module.exports = class Equipment {

    constructor() {

        this.id = "001";
        this.name = "001";
        this.manufactor = "001";
        this.img = "001";
        this.category = {};
        this.category.idDep = "001";
        this.category.idCat = "001";
        this.deviceData = {};
        this.deviceData.weight = 18.1;
        this.deviceData.power = 800;
        this.deviceData.transportWeight = 6.66;
        this.deviceData.volume = 0.228;
        this.case = {};
        this.case.inCase = 4;
        this.case.length = 2.3;
        this.case.width = 3.2;
        this.case.height = 3.3;
        this.quantity = {};
        this.quantity.all = {};
        this.quantity.all.qty = 1;
        this.quantity.all.qtyWork = 1;
        this.quantity.all.qtyBroken = 1;
        this.quantity.all.qtyCondWork = 1;

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

        id = id + ".____";
        console.log("id:",id);

        try {
            return db.execute('SELECT * FROM `v_equipment` WHERE idFixture LIKE ?', [id]);
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

    static getQty() {
        try {
            return db.execute('SELECT * FROM `v_qty`');
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
            let updateQuery = utils.updateMultiple(idWarehouse, idFixture);
            return db.query(updateQuery);
        } catch (error) {
            return error;
        }
    }

    static getAllModels() {
        try {
            return db.execute('SELECT * FROM `v_equip_model`');
        } catch (error) {
            return error;
        }
    }

    static getOneModel(id) {
        try {
            const idDep = id.slice(0,3);
            const idCat = id.slice(4,7);
            id = id.slice(8,11);

            return db.execute('SELECT * FROM `v_equip_model` WHERE `idDep`=? AND `idCat`=? AND `id`=?',[idDep, idCat, id]);

        } catch (error) {
            return error;
        }
    }
}