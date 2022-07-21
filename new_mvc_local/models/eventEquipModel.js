const dtb = require('../config/database');
const db = dtb.promise();

module.exports = class EventEquip {

    constructor(idEvent, idFixture, requiredQty, idWarehouse, whsQty, idUser) {
        this.idEvent = idEvent;
        this.idFixture = idFixture;
        this.requiredQty = requiredQty;
        this.idWarehouse = idWarehouse;
        this.whsQty = whsQty;
    }

    static addEventEquip(dataRow) {
        console.log('addEventEquip');
        console.log('dataRow:', dataRow);
        try {
            return db.query('INSERT INTO `t_event_equipment` (idEvent, idFixture, requiredQty, idWarehouse, whsQty, idUser, unixTime) VALUES ?', [dataRow]);
        } catch (error) {
            return error;
        }
    }

    static selectFixturesByID(idModelName, idWarehouse, qty) {
        console.log('selectFixturesByID');
        idModelName = idModelName + '%';
        let query = "SELECT `idFixture` FROM `t_equipment` WHERE `idFixture` NOT LIKE '%000' AND `idFixture` LIKE ? AND `idWarehouse` = ? ORDER BY RAND() LIMIT ?;"
        try {
            return db.execute(query, [idModelName, idWarehouse, qty]);
        } catch (error) {
            return error;
        }
    }
}