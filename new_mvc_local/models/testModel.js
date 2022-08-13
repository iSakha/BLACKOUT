const dtb = require('../config/database');
const db = dtb.promise();

class Test {

    constructor(eventId, event) {

        this.id = eventId;
        this.title = event.title;
        this.time = { start: event.start, end: event.end };
        this.warehouse = { id: event.idWarehouse, name: event.warehouse };
        this.client = { id: event.idClient, name: event.client};
        this.status = { id: event.idStatus, name: event.status};
        this.location = {city:{id:event.idEventCity,name:event.eventCity},place:{id:event.idEventPlace,name:event.eventPlace}};
        this.manager = {id:event.idManager_1,name:event.manager_1};
        this.notes = event.notes;
    }


    static test_1() {
        return "OK"
    }

    static createEvent(eventRow) {
        console.log("createEvent eventRow:", eventRow);
        try {
            return db.execute('INSERT INTO `t_events` (idEvent, idWarehouse, title, start, end, idManager_1, idEventCity, idEventPlace, idClient, idCreatedBy, notes, idStatus, idUpdatedBy, unixTime) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', eventRow);
        } catch (error) {
            return error;
        }
    }

    static createPhase(phaseArr) {
        console.log("createPhase phaseArr:", phaseArr);
        try {
            return db.query('INSERT INTO `t_event_phase` (idEvent, idPhase, startPhase, endPhase, idUser, unixTime) VALUES ?', [phaseArr]);
        } catch (error) {
            return error;
        }
    }

    static createBook(bookArr) {
        console.log("createBook bookArr:", bookArr);
        try {
            return db.query('INSERT INTO `t_event_equipment` (idEvent, idFixture, requiredQty, idWarehouse, idUser, unixTime) VALUES ?', [bookArr]);
        } catch (error) {
            return error;
        }
    }

    static getOne(idEvent) {
        try {
            return db.execute('SELECT * FROM `v_events` WHERE `idEvent`=?', [idEvent]);
        } catch (error) {
            return error;
        }
    }

    // static getOne(idEvent) {
    //     try {
    //         return db.execute('SELECT * FROM `v_events`');
    //     } catch (error) {
    //         return error;
    //     }
    // }

}



module.exports = Test;
