const dtb = require('../config/database');
const db = dtb.promise();

module.exports = class Phase {
    constructor(oPhase) {
        this.idEvent = oPhase.idEvent;
        this.id = oPhase.id;
        this.phase = oPhase.phase;
        this.start = oPhase.start;
        this.end = oPhase.end;
    }

    static writeEventPhase(eventPhase) {
        console.log("writeEventPhase:", eventPhase);
        try {
            return db.query('INSERT INTO `t_event_details` (idPhase, startPhase, endPhase, idEvent) VALUES ?', [eventPhase]);
        } catch (error) {
            return error;
        }
    }

    static updateEventPhase(eventPhase) {
        console.log("updateEventPhase:", eventPhase);
        try {
            return db.query('UPDATE `t_event_details` SET  idPhase=?, startPhase=?, endPhase=? WHERE idEvent=?', eventPhase);
        } catch (error) {
            return error;
        }
    }

    // static updateClient(clientRow) {
    //     try {
    //         return db.execute('UPDATE `t_clients` SET client=?, clientDescription=?, comments=? WHERE id=?', clientRow);
    //     } catch (error) {
    //         return error;
    //     }
    // }

    static getAllPhase() {
        try {
            return db.execute('SELECT idEvent, id, phase, start, end FROM `v_event_details`');
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