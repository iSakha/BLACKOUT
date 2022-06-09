const dtb = require('../config/database');
const db = dtb.promise();

module.exports = class Event {

    constructor(oEvent) {

        this.idEvent = oEvent.idEvent;
        this.idWarehouse = oEvent.idWarehouse;
        this.title = oEvent.title;
        this.start = oEvent.start;
        this.end = null;
        this.idManager_1 = null;
        this.idManager_2 = null;
        this.idEventCity = null;
        this.idEventPlace = null;
        this.idClient = null;
        this.idCreatedBy = null;
        this.createdAt = null;
        this.notes = null;
        this.idStatus = null;
        this.idPhase = null;
        this.phaseTimeStart = null;
        this.phaseTimeEnd = null;
        this.idUpdatedBy = null;
        this.updatedAt = null;
        this.is_deleted = null;
    }

    static getAll() {       
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

    static createEvent(eventObj) {
        console.log("eventObj:", eventObj);
        try {
            return db.execute('INSERT INTO `t_events`(idEvent, idWarehouse, title, start, end, idManager_1, idManager_2, idEventCity, idEventPlace, idClient, idCreatedBy, createdAt, notes, idStatus, idPhase, phaseTimeStart, phaseTimeEnd, idUpdatedBy) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [eventObj.idEvent, eventObj.idWarehouse, eventObj.title, eventObj.start, eventObj.end, eventObj.idManager_1, eventObj.idManager_2, eventObj.idEventCity, eventObj.idEventPlace, eventObj.idClient, eventObj.idCreatedBy, eventObj.createdAt, eventObj.notes, eventObj.idStatus, eventObj.idPhase, eventObj.phaseTimeStart, eventObj.phaseTimeEnd, eventObj.idUpdatedBy]);
        } catch (error) {
            return error;
        }
    }

    static getLocations(){
        return db.execute('SELECT * FROM `v_location`');
    }

    static getClients(){
        return db.execute('SELECT * FROM `t_clients`');
    }

    static getUsers(){
        return db.execute('SELECT * FROM `v_users`');
    }

    static getStatus(){
        return db.execute('SELECT * FROM `t_status`');
    }

    static getSummary(){
        return db.execute('SELECT * FROM `v_summary_final`');
    }

}