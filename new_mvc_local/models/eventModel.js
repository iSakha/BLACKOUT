const dtb = require('../config/database');
const db = dtb.promise();


module.exports = class Event {

    constructor(eventId, event) {
        console.log("eventRow:", event);
        console.log("eventId:", eventId);
        
        this.id = eventId;
        this.time = { start: event.start, end: event.end };
        this.warehouse = { id: event.idWarehouse, name: event.warehouse };
        this.title = event.title;
        this.creator = { id: event.idCreatedBy, name: event.createdBy};
        this.client = { id: event.idClient, name: event.client};
        this.status = { id: event.idStatus, name: event.status}; 
        this.location = {city:{id:event.idEventCity,name:event.eventCity},place:{id:event.idEventPlace,name:event.eventPlace}};
        this.manager = {id:event.idManager_1,name:event.manager_1};           
        this.notes = event.notes;
    }

    static  destructObj(userId, obj) {

        console.log("destructObj:", obj);
        console.log("=====================================");
    
        console.log("id:", obj.id);
    
        let { id, time: { start }, time: { end }, warehouse: { id: whId }, title, creator: { id: creatorId }, client: { id: clientId }, status: { id: statusId }, location: { city: { id: cityId }, place: { id: placeId } }, manager: { id: managerId }, notes } = obj;
    
        let eventRow = [];
        let phaseArr = [];
        let bookArr = [];
        let errMsg = null;
    
        let unixTime = Date.now();
    
        eventRow.push(id);
        eventRow.push(whId);
        eventRow.push(title);
        eventRow.push(start.slice(0, 16));
        eventRow.push(end.slice(0, 16));
        eventRow.push(managerId);
        eventRow.push(cityId);
        eventRow.push(placeId);
        eventRow.push(clientId);
        eventRow.push(creatorId);
        eventRow.push(notes);
        eventRow.push(statusId);
        eventRow.push(userId);
        eventRow.push(unixTime);
        
    
        let i = 0;
        eventRow.map(item => {
    
            console.log(i, "item:", item);
            i++;
        })
    
    
        if (obj.phase.length > 0) {
            obj.phase.map(item => {
                let phaseRow = [];
                let { id, start, end } = item;
    
                // console.log("obj.phase:", obj.phase);
    
                phaseRow.push(eventRow[0]);     // eventId
                phaseRow.push(id);
                phaseRow.push(start.slice(0, 16));
                phaseRow.push(end.slice(0, 16));
                phaseRow.push(clientId);
                phaseRow.push(unixTime);
    
                phaseArr.push(phaseRow);
            })
    
            console.log("phaseArr:", phaseArr);
        }
    
        if (obj.booking.length > 0) {
            obj.booking.map(item => {
                let bookRow = [];
                let { id, qtt } = item;
    
                // console.log("req.body.booking:", req.body.booking);
    
                bookRow.push(eventRow[0]);      // eventId
                bookRow.push(id + ".0000");
                bookRow.push(qtt);
                bookRow.push(eventRow[1]);      // whId
                bookRow.push(clientId);
                bookRow.push(unixTime);
    
                bookArr.push(bookRow);
            })
    
            console.log("bookArr:", bookArr);
        }
    
        return [errMsg, eventRow, phaseArr, bookArr];
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
            return db.execute('SELECT * FROM `v_events_history`');
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
            return db.execute('SELECT * FROM `v_events_history` WHERE `idEvent`=?', [idEvent]);
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

    static deleteEvent(idEvent) {
        try {
            return db.execute('SELECT idEvent, idWarehouse, title, start, end, idManager_1, idEventCity, idEventPlace, idClient, idCreatedBy, notes, idStatus, idUpdatedBy, unixTime FROM t_events WHERE idEvent=? AND is_deleted=0', [idEvent]);
        } catch (error) {
            return error;
        }
    }

    // static deleteEvent(id, userId, unixTime) {
    //     try {
    //         return db.execute('UPDATE t_events SET t_events.is_deleted = 1, t_events.idUpdatedBy=?, t_events.unixTime=? WHERE t_events.idEvent=?', [userId, unixTime, id]);
    //     } catch (error) {
    //         return error;
    //     }
    // }

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