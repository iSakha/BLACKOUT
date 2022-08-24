const dtb = require('../config/database');
const db = dtb.promise();
const utils = require('../utils/utils');

module.exports = class BookedEquip {
   constructor(equip, mode) {

      switch (mode) {
         case 1:
            console.log("case1");
            this.id = equip.idModel.slice(0, 11);
            this.qtt = equip.qtt;
            this.name = equip.name;

            break;

         case 2:
            console.log("case2", equip.idWh);

            if (equip.idWh === undefined) {
               console.log("all");
               this.date = equip.date;
               this.id = equip.idModel.slice(0, 11);
               this.name = equip.name;
               this.inWork = { qtt: equip.qttInUse };
               this.onWarehouse = { qtt: equip.availableAll };
            } else {
               console.log("not all");
               let whAvailableQtt = [equip.availableMinsk, equip.availableMoscow, equip.availableKazan, equip.availablePiter]

               this.date = equip.date;
               this.id = equip.idModel.slice(0, 11);
               this.name = equip.name;
               this.inWork = { qtt: equip.qttInUse };               
               this.onWarehouse = { qtt: whAvailableQtt[equip.idWh - 2] };
               break;
            }
      }


      // this.date = equip.date;
      // this.inWork = {qtt:equip.qttInUse};
   }

   static setBookedModels(dataRow) {
      console.log("setBookedModels dataRow:", dataRow);
      return db.query('INSERT INTO `t_event_equipment` (idEvent, idFixture, requiredQty, idWarehouse, idUser, unixTime) VALUES ?', [dataRow]);
   }



   static writeToBookCalendar(dataArr) {
      console.log("writeToBookCalendar dataRow:", dataArr);
      return db.query('INSERT INTO `t_booking_calendar` (idEvent, idModel, qtt, idWh, idUser, unixTime, date) VALUES ?', [dataArr]);
   }

   static getBookedModelsByEventID(id) {
      console.log("getBookedModelsByEventID:", id);
      return db.query('SELECT `idEvent`, SUBSTRING(`id`,1,11) AS `id`, `name`, `qtt` FROM `v_event_equipment` WHERE `idEvent`=?', [id]);
      // return db.query('SELECT `t`.`idFixture`, `t`.`idWarehouse`, `e`.`modelName`, `t`.`requiredQty` AS `qtt`  FROM `t_event_equipment` `t` JOIN `t_equipment` `e` ON `t`.idFixture =`e`.`idFixture` WHERE `idEvent`=?', [id]);
   }

   // static getBookedModelsByEventIDwhID(eventID, whID) {
   //    console.log("getBookedModelsByEventID, eventID:", eventID);
   //    console.log("getBookedModelsByEventID, whID", whID);
   //    return db.query('SELECT `t`.`idFixture`, `t`.`idWarehouse`, `e`.`modelName`, `t`.`requiredQty` AS `qtt` FROM `t_event_equipment` `t` JOIN `t_equipment` `e` ON `t`.idFixture =`e`.`idFixture` WHERE `t`.`idEvent`=? AND `t`.`idWarehouse`=?'  , [eventID, whID]);
   // }

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

   static bookedGetAllModels() {
      console.log("bookedGetAll");
      return db.query('SELECT `idEvent`, `id` AS `idModel`, `name`, `qtt` FROM `v_event_equipment`');
   }

   // static bookedGetAllModels() {
   //    console.log("bookedGetAll");
   //    return db.query('SELECT `idEvent`, SUBSTRING(`id`,1,11) AS `id`, `name`, `qtt` FROM `v_event_equipment`');
   // }

   // static bookedEquipGetAll() {
   //    console.log("bookedEquipGetAll");
   //    return db.query('SELECT * FROM `v_booked_equip`');
   // }

   static getEvents() {
      console.log("getEvents");
      return db.query('SELECT DISTINCT `b`.`idEvent`,`t_events`.`title`,`t_events`.`start`,`t_events`.`end` FROM `v_booked_equip` `b` JOIN `t_events` ON `b`.`idEvent` = `t_events`.`idEvent` ORDER BY `date`');
   }

   static getBookedEquipOnInterval(idWh, start, end) {
      console.log("getBookedEquipOnInterval", idWh, start, end);
      switch (idWh) {
         case "all":
            console.log("case all");
            return db.query('SELECT * FROM `v_booked_equip_all` WHERE `v_booked_equip_all`.`date` >=? AND `v_booked_equip_all`.`date` <=?', [start, end]);

         default:
            console.log("case idWh");
            return db.query('SELECT * FROM `v_booked_equip` WHERE `v_booked_equip`.`date` >=? AND `v_booked_equip`.`date` <=? AND idWh=?', [start, end, idWh]);
      }

   }

}