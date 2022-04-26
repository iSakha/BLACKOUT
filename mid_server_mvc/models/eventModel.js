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
Event.getAllEvents = (result) =>{
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

module.exports = Event;