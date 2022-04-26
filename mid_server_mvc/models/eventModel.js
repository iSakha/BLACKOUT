let dbConn = require('../config/config.js');

let Event = function (event) {

    this.id = event.id;
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
    // let dataArray = [data.calendarId, data.title, dateStartObj, dateEndObj, data.location];
    // console.log("dataArray", dataArray);
    dbConn.query('INSERT INTO t_events SET ? ', eventReqData, (err, res)=>{
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