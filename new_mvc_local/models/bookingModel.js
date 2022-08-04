const dtb = require('../config/database');
const db = dtb.promise();
const utils = require('../utils/utils');

module.exports = class BookedEquip {
    constructor() {

    }

 static setBookedModels(dataRow) {
    console.log("setBookedModels dataRow:",dataRow);
    return db.query('INSERT INTO `t_event_equipment` (idEvent, idFixture, requiredQty, idWarehouse, whsQty, idUser, unixTime) VALUES ?', [dataRow]);
 }   

static setBookModels(dataRow) {
    try {
        return db.query('INSERT INTO `t_event_equipment` (idEvent, idFixture, requiredQty, idWarehouse, whsQty, idUser, unixTime) VALUES ?', [dataRow]);
    } catch (error) {
        return error;
    }
}

static bookFixtures() {
    
}

}