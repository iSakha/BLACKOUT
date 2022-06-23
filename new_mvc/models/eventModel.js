const dtb = require('../config/database');
const db = dtb.promise();


module.exports = class Event {

    constructor() {

        this.id = null;
        this.title = null;
        this.time = { start: null };
        this.warehouse = { id: null };
        this.creator = { id: 1 };
        this.client = { id: 1 };
        this.status = { id: 1 };
        this.location = {
            city: { id: 1 },
            place: { id: 1 }
        }
        this.manager = { id: 1 };
        this.phase = null;
        this.notes = "";
    }

    // Events queries
    // =====================================================================
    static getAll() {
        try {
            return db.execute('SELECT * FROM `v_events_latest_state`');
        } catch (error) {
            return error;
        }
    }


    static getAllHistory() {
        try {
            return db.execute('SELECT * FROM `v_events`');
        } catch (error) {
            return error;
        }
    }

    static getOne(idEvent) {
        try {
            return db.execute('SELECT * FROM `v_events_latest_state` WHERE `idEvent`=?', [idEvent]);
        } catch (error) {
            return error;
        }
    }

    static getOneHistory(idEvent) {
        try {
            return db.execute('SELECT * FROM `v_events` WHERE `idEvent`=?', [idEvent]);
        } catch (error) {
            return error;
        }
    }

    static createEvent(eventRow) {
        console.log("createEvent_mod eventRow:", eventRow);
        try {
            return db.execute('INSERT INTO `t_events` (idEvent, idWarehouse, title, start, end, idManager_1, idEventCity, idEventPlace, idClient, idCreatedBy, notes, idStatus, idUpdatedBy, unixTime) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', eventRow);
        } catch (error) {
            return error;
        }
    }

    // static createEvent(eventRow) {
    //     console.log("createEvent_mod eventRow:", eventRow);
    //     try {
    //         return db.execute('INSERT INTO `t_events` (idEvent, idWarehouse, title, start) VALUES(?, ?, ?, ?)', ['16555630655', 2, 'Би-2', '2022-06-14T21:00:00']);
    //     } catch (error) {
    //         return error;
    //     }
    // }

    // static createEvent(eventRow) {
    //     console.log("createEvent eventRow:", eventRow);
    //     try {
    //         return db.execute('INSERT INTO `t_events` (idEvent, idWarehouse, title, start, end, idManager_1, idManager_2, idEventCity, idEventPlace, idClient, idCreatedBy, notes, idStatus, idUpdatedBy) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', eventRow);
    //     } catch (error) {
    //         console.log("error:",error);
    //         return error;
    //     }
    // }

    // static createEvent(eventObj) {
    //     console.log("createEvent eventObj:", eventObj);
    //     try {
    //         return db.execute('INSERT INTO `t_events` (idEvent, idWarehouse, title, start, end, idManager_1, idManager_2, idEventCity, idEventPlace, idClient, idCreatedBy, createdAt, notes, idStatus, idPhase, phaseTimeStart, phaseTimeEnd, idUpdatedBy) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [eventObj.idEvent, eventObj.idWarehouse, eventObj.title, eventObj.start, eventObj.end, eventObj.idManager_1, eventObj.idManager_2, eventObj.idEventCity, eventObj.idEventPlace, eventObj.idClient, eventObj.idCreatedBy, eventObj.createdAt, eventObj.notes, eventObj.idStatus, eventObj.idPhase, eventObj.phaseTimeStart, eventObj.phaseTimeEnd, eventObj.idUpdatedBy]);
    //     } catch (error) {
    //         return error;
    //     }
    // }

    static updateEvent(eventObj) {
        console.log("eventObj:", eventObj);
        try {
            return db.execute('INSERT INTO `t_events`(idEvent, idWarehouse, title, start, end, idManager_1, idManager_2, idEventCity, idEventPlace, idClient, idCreatedBy, createdAt, notes, idStatus, idPhase, phaseTimeStart, phaseTimeEnd, idUpdatedBy) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [eventObj.idEvent, eventObj.idWarehouse, eventObj.title, eventObj.start, eventObj.end, eventObj.idManager_1, eventObj.idManager_2, eventObj.idEventCity, eventObj.idEventPlace, eventObj.idClient, eventObj.idCreatedBy, eventObj.createdAt, eventObj.notes, eventObj.idStatus, eventObj.idPhase, eventObj.phaseTimeStart, eventObj.phaseTimeEnd, eventObj.idUpdatedBy]);
        } catch (error) {
            return error;
        }
    }

    static getSummary() {
        return db.execute('SELECT * FROM `v_summary_final`');
    }

}