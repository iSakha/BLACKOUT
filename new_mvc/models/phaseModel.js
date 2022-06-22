const dtb = require('../config/database');
const db = dtb.promise();

module.exports = class Phase {
    constructor(oPhase) {
        this.idEvent = oPhase.idEvent;
        this.id = oPhase.idPhase;
        this.phase = oPhase.phase;
        this.start = oPhase.startPhase;
        this.end = oPhase.endPhase;
    }

    static writeEventPhase(eventPhase) {
        console.log("writeEventPhase:", eventPhase);
        try {
            return db.query('INSERT INTO `t_event_details` (idEvent, idPhase, startPhase, endPhase) VALUES ?', [eventPhase]);
        } catch (error) {
            return error;
        }
    }

    static getAllPhase() {       
        try {
           return db.execute('SELECT * FROM `v_event_details`'); 
        } catch (error) {
            return error;
        }
    }

    static getOnePhase(idEvent) {
        try {
           return db.execute('SELECT * FROM `v_event_details` WHERE `idEvent`=?', [idEvent]); 
        } catch (error) {
            return error;
        }        
    }

    static createPhase(oPhase) {
        console.log("eventObj:", oPhase);
        try {
            return db.execute('INSERT INTO `t_event_details`(idEvent, idPhase, startPhase, endPhase) VALUES(?, ?, ?, ?)', [oPhase.idEvent, oPhase.idPhase, oPhase.startPhase, oPhase.endPhase]);
        } catch (error) {
            return error;
        }
    }

}