let dbConn = require('../config/config.js');

let Event = function (event) {

    this.title = event.title;
    this.calendarId = event.calendarId;
    this.start = event.start;
    this.end = event.end;
    this.notes = event.notes;
    this.location = event.location;

}

// get all events
Event.getEvents = (result) =>{
    dbConn.query('SELECT * FROM v_events', (err, res)=>{
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
    let dataArray = [eventReqData.calendarId, eventReqData.title, dateStartObj, dateEndObj, eventReqData.location, eventReqData.notes];
    const sql = "INSERT INTO t_events(calendarId, title, start, end, location) VALUES(?, ?, ?, ?, ?)";
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
    dbConn.query('DELETE FROM t_events WHERE id=?', [id], (err, res)=>{
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
    const sql = "UPDATE t_events SET calendarId=?, title=?, start=?, end=?, notes=?, location=? WHERE id=?";
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
    dbConn.query('SELECT * FROM v_events_summary', (err, res)=>{
        if(err){
            console.log('Error while fetching events', err);
            result(null,err);
        }else{
            console.log('Events fetched successfully');
            result(null,res);
        }
    })
}

// get employee by ID 
Event.getEventByID = (id, result)=>{
    dbConn.query('SELECT * FROM v_events WHERE id=?', id, (err, res)=>{
        if(err){
            console.log('Error while fetching event by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}



module.exports = Event;