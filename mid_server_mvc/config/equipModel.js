let dbConn = require('../config/config.js');

let Event = function (event) {

    this.title = event.title;
    this.warehouseId = event.warehouseId;
    this.start = event.start;
    this.end = event.end;
    this.notes = event.notes;
    this.location_city = event.location_city;
    this.location_place = event.location_place;
    this.status = event.status;
    this.client = event.client;
    this.manager_1 = event.manager_1;
    this.manager_2 = event.manager_2;
    this.current_user = event.current_user;

}

// get all events
Event.getEvents = (result) => {
    dbConn.query('SELECT * FROM v_events', (err, res) => {
        if (err) {
            console.log('Error while fetching events', err);
            result(null, err);
        } else {
            let phObj = [
                {
                  id: 1,
                  id_event: 57,
                  id_phase: 2,
                  phase_title: 'Pogruzka',
                  phase_start: '2022-05-13T08:00:00.000Z',
                  phase_end:' 2022-05-13T10:00:00.000Z'
                },
                {
                  id: 2,
                  id_event: 57,
                  id_phase: 3,
                  phase_title: 'Montage',
                  phase_start: '2022-05-13T12:00:00.000Z',
                  phase_end: '2022-05-14T00:00:00.000Z'
                },
                {
                  id: 5,
                  id_event: 57,
                  id_phase: 4,
                  phase_title: 'Repeticia',
                  phase_start: '2022-05-14T03:00:00.000Z',
                  phase_end: '2022-05-14T14:00:00.000Z'
                },
                {
                  id: 6,
                  id_event: 57,
                  id_phase: 5,
                  phase_title: 'Rabota',
                  phase_start: '2022-05-15T04:00:00.000Z',
                  phase_end: '2022-05-15T15:00:00.000Z'
                },
                {
                  id: 7,
                  id_event: 57,
                  id_phase: 5,
                  phase_title: 'Rabota',
                  phase_start: '2022-05-16T04:00:00.000Z',
                  phase_end: '2022-05-16T15:00:00.000Z'
                },
                {
                  id: 8,
                  id_event: 57,
                  id_phase: 5,
                  phase_title: 'Rabota',
                  phase_start: '2022-05-17T04:00:00.000Z',
                  phase_end: '2022-05-17T15:00:00.000Z'
                },
                {
                  id: 9,
                  id_event: 57,
                  id_phase: 6,
                  phase_title: 'Demontage',
                  phase_start: '2022-05-18T03:00:00.000Z',
                  phase_end: '2022-05-19T03:00:00.000Z'
                },
                {
                  id: 10,
                  id_event: 57,
                  id_phase: 7,
                  phase_title: 'Razgruzka',
                  phase_start: '2022-05-19T05:00:00.000Z',
                  phase_end: '2022-05-19T08:00:00.000Z'
                }
              ]
            for (let i = 0; i < res.length; i++) {
                // res[i].event_phase = getPhases(res[i].id);
                res[i].event_phase = phObj;
            }
            result(null, res);
        }
    })
}
// create new event
Event.createEvent = (eventReqData, result) =>{
    // console.log("eventReqData:", eventReqData);
    let dateStartObj = new Date(eventReqData.start);
    console.log("dateStartObj", dateStartObj)
    let dateEndObj = new Date(eventReqData.end);
    console.log("dateEndObj", dateEndObj)
    let dataArray = [eventReqData.warehouseId, eventReqData.title, dateStartObj, dateEndObj, eventReqData.location_city, eventReqData.location_place, eventReqData.notes, eventReqData.status, eventReqData.client, eventReqData.manager_1, eventReqData.manager_2, eventReqData.current_user];

    // console.log("dataArray:", dataArray)
    const sql = "INSERT INTO t_events(`warehouseId`, `title`, `start`, `end`, `location_city`, `location_place`, `notes`, `status`, `client`, `manager_1`, `manager_2`, `current_user`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    dbConn.query(sql, dataArray, (err, res)=>{
        if(err){
            console.log('Error while inserting data', err);
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
            console.log('Error while deleting the event');
            result(null, err);
        }else{
            console.log('Event deleted from database!');
            result(null, res);
        }
    });
}

// update event
Event.updateEvent = (id, eventReqData, result)=>{
    let dateStartObj = new Date(eventReqData.start);
    let dateEndObj = new Date(eventReqData.end);
    let dataArray = [eventReqData.warehouseId, eventReqData.title, dateStartObj, dateEndObj, eventReqData.location_city, eventReqData.location_place, eventReqData.notes, eventReqData.status, eventReqData.client, eventReqData.manager_1, eventReqData.manager_2, eventReqData.current_user,id];
    const sql = "UPDATE `t_events` SET `warehouseId`=?, `title`=?, `start`=?, `end`=?, `location_city`=?, `location_place`=?, `notes`=?, `status`=?, `client`=?, `manager_1`=?, `manager_2`=?, `current_user`=? WHERE id=?";
    dbConn.query(sql, dataArray, (err, res)=>{
        if(err){
            console.log('Error while updating the event', err);
            result(null, err);
        }else{
            console.log("Event updated successfully");
            result(null, res);
        }
    });
}

// get events summary
Event.getEventsSummary = (result) =>{
    dbConn.query('SELECT * FROM v_events_summary_final', (err, res)=>{
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
    dbConn.query('SELECT * FROM `v_events` WHERE id=?', id, (err, res)=>{
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


// get events locations
Event.getEventLocations = (result) =>{
    dbConn.query('SELECT * FROM v_event_location', (err, res)=>{
        if(err){
            console.log('Error while fetching events locations', err);
            result(null,err);
        }else{
            console.log('Events locations fetched successfully');
            result(null,res);
        }
    })
}


module.exports = Event;