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

static writeToBookCalendar(dataRow) {
   console.log("writeToBookCalendar dataRow:",dataRow);
   return db.query('INSERT INTO `t_booking_calendar` (date, idEvent, idModel, qtt, idWh) VALUES ?', [dataRow]);
}

static getBookedModelsByEventID(id) {
   console.log("getBookedModelsByEventID:",id);
   return db.query('SELECT `t`.`idFixture`, `t`.`whsQty`, `t`.`idWarehouse`, `e`.`modelName` FROM `t_event_equipment` `t` JOIN `t_equipment` `e` ON `t`.idFixture =`e`.`idFixture` WHERE `idEvent`=?', [id]);
}

}