const dtb = require('../config/database');
const db = dtb.promise();
const utils = require('../utils/utils');

module.exports = class BookedEquip {
   constructor() {

   }

   static setBookedModels(dataRow) {
      console.log("setBookedModels dataRow:", dataRow);
      return db.query('INSERT INTO `t_event_equipment` (idEvent, idFixture, requiredQty, idWarehouse, whsQty, idUser, unixTime) VALUES ?', [dataRow]);
   }

   static writeToBookCalendar(dataRow) {
      console.log("writeToBookCalendar dataRow:", dataRow);
      return db.query('INSERT INTO `t_booking_calendar` (date, idEvent, idModel, qtt, idWh) VALUES ?', [dataRow]);
   }

   static getBookedModelsByEventID(id) {
      console.log("getBookedModelsByEventID:", id);
      return db.query('SELECT `t`.`idFixture`, `t`.`whsQty`, `t`.`idWarehouse`, `e`.`modelName` FROM `t_event_equipment` `t` JOIN `t_equipment` `e` ON `t`.idFixture =`e`.`idFixture` WHERE `idEvent`=?', [id]);
   }

   // delete from t_event_equipment
   static deleteModelsByEventID_1(id) {
      console.log("deleteModelsByEventID_1:", id);
      return db.query('DELETE FROM `t_event_equipment` WHERE `idEvent`=?', [id]);
   }

   // delete from t_booking_calendar
   static deleteModelsByEventID_2(id) {
      console.log("deleteModelsByEventID_1:", id);
      return db.query('DELETE FROM `t_booking_calendar` WHERE `idEvent`=?', [id]);
   }

   static bookedEquipGetAll() {
      console.log("bookedEquipGetAll");
      return db.query('SELECT * FROM `v_booked_equip`');
   }

   static getEvents() {
      console.log("getEvents");
      return db.query('SELECT DISTINCT `b`.`idEvent`,`t_events`.`title`,`t_events`.`start`,`t_events`.`end` FROM `v_booked_equip` `b` JOIN `t_events` ON `b`.`idEvent` = `t_events`.`idEvent` ORDER BY `date`');
   }

   static getBookedEquipOnInterval(start, end) {
      console.log("getBookedEquipOnInterval", start, end);
      return db.query('SELECT * FROM `v_booked_equip` WHERE `v_booked_equip`.`date` >=? AND `v_booked_equip`.`date` <=?', [start, end]);
   }

}