const mysql = require("mysql2");
let config = require('../config/config.js');
const eventModel = require('../models/eventModel.js');

// exports.addEvent = function (data, response) {
//     // let connection = mysql.createConnection(config);
//     // let dateStartObj = new Date(data.start);
//     // let dateEndObj = new Date(data.end);

//     // console.log("data.start:", dateStartObj);
    
//     // let dataArray = [data.calendarId, data.title, dateStartObj, dateEndObj, data.location];
//     // console.log("dataArray", dataArray);
    
//     // const sql = "INSERT INTO t_events(calendarId, title, start, end, location) VALUES(?, ?, ?, ?, ?)";
//     // connection.query(sql, dataArray, function (err, results) {
//     //     if (err) return console.log(err);
//     response.send(data);
//         // readEvents(response);
//     // });
// };


// get all events list
exports.getEvents = (req, res)=> {
    //console.log('here all employees list');
    eventModel.getAllEvents((err, events) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('Employees', events);
        res.send(events)
    })
}

// create new event
exports.createNewEvent = (req, res) =>{
    const eventReqData = new eventModel(req.body);
    console.log('eventReqData', eventReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        eventModel.createEvent(eventReqData, (err, event)=>{
            if(err)
            res.send(err);
            // res.json({status: true, message: 'Event Created Successfully', data: employee.insertId})
            res.send('ok');
        })
    }
}
