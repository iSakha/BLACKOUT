const mysql = require("mysql2");
let config = require('../config/config.js');
const eventModel = require('../models/eventModel.js');

// get all events list
exports.getEvents = (req, res)=> {
    //console.log('here all employees list');
    eventModel.getEvents((err, events) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('Events', events);
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
            res.json({status: true, message: 'Event Created Successfully'})
            // res.json({status: true, message: 'Event Created Successfully',data: event.insertId})
        })
    }
}

// delete event
exports.deleteEvent = (req, res)=>{
    eventModel.deleteEvent(req.params.id, (err, event)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'Event deleted successully!'});
    })
}

// update event
exports.updateEvent = (req, res)=>{
    const eventReqData = new eventModel(req.body);
    console.log('eventReqData update', eventReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        eventModel.updateEvent(req.params.id, eventReqData, (err, event)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Event updated Successfully'})
        })
    }
}

// get events summary
exports.getEventsSummary = (req, res)=> {
    eventModel.getEventsSummary((err, events) =>{
        // console.log('We are here');
        if(err)
        res.send(err);
        console.log('Employees', events);
        res.send(events)
    })
}

// get employee by ID
exports.getEventByID = (req, res)=>{
    //console.log('get emp by id');
    eventModel.getEventByID(req.params.id, (err, event)=>{
        if(err)
        res.send(err);
        console.log('single employee data',event);
        res.send(event);
    })
}
