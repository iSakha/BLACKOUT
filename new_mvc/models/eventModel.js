const dtb = require('../config/database');
const db = dtb.promise();

module.exports = class Event {

    constructor() {

    }

    static getAll() {
        return db.execute('SELECT * FROM `t_events`');
    }

    static createEvent(eventObj) {
        console.log("eventObj:",eventObj);
        return db.execute('INSERT INTO `t_events`(idEvent, idWarehouse, title, start) VALUES(?, ?, ?, ?)', [eventObj.idEvent, eventObj.idWarehouse, eventObj.title, eventObj.start]);
    }

}