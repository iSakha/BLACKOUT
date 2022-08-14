const dtb = require('../config/database');
const db = dtb.promise();

module.exports = class Phase {
    constructor(phase) {
        this.id = phase.id;
        this.phase = phase.phase;
        this.start = phase.start;
        this.end = phase.end;
    }

    static writeEventPhase(eventPhase) {
        console.log("writeEventPhase:", eventPhase);
        try {
            return db.query('INSERT INTO `t_event_phase` (idEvent, idPhase, startPhase, endPhase, idUser, unixTime) VALUES ?', [eventPhase]);
        } catch (error) {
            return error;
        }
    }

    static updateEventPhase(eventPhase) {
        console.log("updateEventPhase:", eventPhase);
        try {
            return db.query('INSERT INTO `t_event_phase` (idPhase, startPhase, endPhase, unixTime, idEvent) VALUES ?', [eventPhase]);
            
        } catch (error) {
            return error;
        }
    }

    static getAllPhase() {
        try {
            return db.execute('SELECT idEvent, id, phase, start, end FROM `v_event_phase`');
        } catch (error) {
            return error;
        }
    }

    static getOnePhase(idEvent) {
        try {
            return db.execute('SELECT id, phase, start, end FROM `v_event_phase` WHERE `idEvent`=?', [idEvent]);
        } catch (error) {
            return error;
        }
    }

    static createPhase(oPhase) {
        console.log("eventObj:", oPhase);
        try {
            return db.execute('INSERT INTO `t_event_phase`(idEvent, idPhase, startPhase, endPhase) VALUES(?, ?, ?, ?)', [oPhase.idEvent, oPhase.idPhase, oPhase.startPhase, oPhase.endPhase]);
        } catch (error) {
            return error;
        }
    }

}