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
}