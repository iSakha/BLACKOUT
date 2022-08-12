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
            return db.execute('SELECT * FROM `v_events`');
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
            return db.execute('SELECT * FROM `v_events` WHERE `idEvent`=?', [idEvent]);
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

    static updateEvent(eventObj) {
        console.log("eventObj:", eventObj);
        try {
            return db.execute('INSERT INTO `t_events`(idEvent, idWarehouse, title, start, end, idManager_1, idManager_2, idEventCity, idEventPlace, idClient, idCreatedBy, createdAt, notes, idStatus, idPhase, phaseTimeStart, phaseTimeEnd, idUpdatedBy, unixTime) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [eventObj.idEvent, eventObj.idWarehouse, eventObj.title, eventObj.start, eventObj.end, eventObj.idManager_1, eventObj.idManager_2, eventObj.idEventCity, eventObj.idEventPlace, eventObj.idClient, eventObj.idCreatedBy, eventObj.createdAt, eventObj.notes, eventObj.idStatus, eventObj.idPhase, eventObj.phaseTimeStart, eventObj.phaseTimeEnd, eventObj.idUpdatedBy, eventObj.unixTime]);
        } catch (error) {
            return error;
        }
    }

    // static deleteEvent(eventObj) {
    //     console.log("eventObj:", eventObj);
    //     try {
    //         return db.execute('INSERT INTO `t_events`(idEvent, idWarehouse, title, idManager_1, idManager_2, idEventCity, idEventPlace, idClient, idCreatedBy, notes, idStatus, idPhase,idUpdatedBy, is_deleted) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [eventObj.idEvent, eventObj.idWarehouse, eventObj.title, eventObj.idManager_1, eventObj.idManager_2, eventObj.idEventCity, eventObj.idEventPlace, eventObj.idClient, eventObj.idCreatedBy, eventObj.notes, eventObj.idStatus, eventObj.idPhase, eventObj.idUpdatedBy, eventObj.is_deleted]);
    //     } catch (error) {
    //         return error;
    //     }
    // }

    static deleteEvent(id, userId, unixTime) {
        try {
            return db.execute('UPDATE t_events SET t_events.is_deleted = 1, t_events.idUpdatedBy=?, t_events.unixTime=? WHERE t_events.idEvent=?', [userId, unixTime, id]);
        } catch (error) {
            return error;
        }
    }

    static deletePhase(id, userId, unixTime) {
        try {
            return db.execute('UPDATE t_event_phase SET t_event_phase.is_deleted = 1, t_event_phase.idUser=?, t_event_phase.unixTime=? WHERE t_event_phase.idEvent=?', [userId, unixTime, id]);
        } catch (error) {
            return error;
        }
    }

    static deleteEquipment(id, userId, unixTime) {
        try {
            return db.execute('UPDATE t_event_equipment SET t_event_equipment.is_deleted = 1, t_event_equipment.idUser=?, t_event_equipment.unixTime=? WHERE t_event_equipment.idEvent=?', [userId, unixTime, id]);
        } catch (error) {
            return error;
        }
    }

    static getSummary() {
        return db.execute('SELECT * FROM `v_summary_final`');
    }

}