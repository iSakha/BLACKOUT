let dbConn = require('../config/config.js');

let Event = function (event) {

    this.title = event.title;
    this.calendarId = event.calendarId;
    this.start = event.start;
    this.end = event.end;
    this.notes = event.notes;
    this.location = event.location;
    this.status = event.status;
    this.phase = event.phase;

}

// get all events
Event.getEvents = (result) =>{
    dbConn.query('SELECT * FROM v_events_c', (err, res)=>{
        if(err){
            console.log('Error while fetching events', err);
            result(null,err);
        }else{
            console.log('Events fetched successfully');
            result(null,res);
        }
    })
}

// create new event
Event.createEvent = (eventReqData, result) =>{
    // console.log("eventReqData:", eventReqData);
    let dateStartObj = new Date(eventReqData.start);
    let dateEndObj = new Date(eventReqData.end);
    let dataArray = [eventReqData.calendarId, eventReqData.title, dateStartObj, dateEndObj, eventReqData.location, eventReqData.notes, eventReqData.status, eventReqData.phase];
    const sql = "INSERT INTO t_events_c(calendarId, title, start, end, location, notes, status, phase) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
    dbConn.query(sql, dataArray, (err, res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null, err);
        }else{
            console.log('Event created successfully');
            result(null, res)
        }
    })

}

// delete event
Event.deleteEvent = (id, result)=>{
    dbConn.query('DELETE FROM t_events_c WHERE id=?', [id], (err, res)=>{
        if(err){
            console.log('Error while deleting the employee');
            result(null, err);
        }else{
            result(null, res);
        }
    });
}

// update event
Event.updateEvent = (id, eventReqData, result)=>{
    let dateStartObj = new Date(eventReqData.start);
    let dateEndObj = new Date(eventReqData.end);
    let dataArray = [eventReqData.calendarId, eventReqData.title, dateStartObj, dateEndObj, eventReqData.notes, eventReqData.location, id];
    const sql = "UPDATE t_events_c SET calendarId=?, title=?, start=?, end=?, notes=?, location=? WHERE id=?";
    dbConn.query(sql, dataArray, (err, res)=>{
        if(err){
            console.log('Error while updating the event');
            result(null, err);
        }else{
            console.log("Event updated successfully");
            result(null, res);
        }
    });
}

// get events summary
Event.getEventsSummary = (result) =>{
    dbConn.query('SELECT * FROM v_events_summary_c', (err, res)=>{
        if(err){
            console.log('Error while fetching events', err);
            result(null,err);
        }else{
            console.log('Events fetched successfully');
            result(null,res);
        }
    })
}

// get event by ID 
Event.getEventByID = (id, result)=>{
    dbConn.query('SELECT * FROM v_events_c WHERE id=?', id, (err, res)=>{
        if(err){
            console.log('Error while fetching event by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

// get events status for drop down
Event.getEventsStatus = (result) =>{
    dbConn.query('SELECT * FROM t_event_status', (err, res)=>{
        if(err){
            console.log('Error while fetching events status', err);
            result(null,err);
        }else{
            console.log('Events status fetched successfully');
            result(null,res);
        }
    })
}

// get events phase for drop down
Event.getEventsPhase = (result) =>{
    dbConn.query('SELECT * FROM t_event_phase', (err, res)=>{
        if(err){
            console.log('Error while fetching events status', err);
            result(null,err);
        }else{
            console.log('Events status fetched successfully');
            result(null,res);
        }
    })
}



module.exports = Event;