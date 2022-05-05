const mysql = require("mysql2");
let config = require('../config/config.js');
const eventModel = require('../models/eventModel.js');

// get all events list
exports.getEvents = (req, res) => {
    //console.log('here all employees list');
    eventModel.getEvents((err, events) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('Events', events);
        res.send(events)
    })
}

// create new event
exports.createNewEvent = (req, res) => {

    const eventReqData = new eventModel(req.body);
    console.log('eventReqData', eventReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        eventModel.createEvent(eventReqData, (err, event) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'Event Created Successfully' })
            // res.json({status: true, message: 'Event Created Successfully',data: event.insertId})
        })
        // res.json({status: true, message: 'Event Created Successfully'})
    }
}

// delete event
exports.deleteEvent = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "PUT,GET,DELETE,PATCH");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type,Origin,Accept,Authorization"
    );
    let id = parseInt(req.params.id);
    eventModel.deleteEvent(id, (err, event) => {
        if (err)
            res.send(err);
        res.json({ success: true, message: 'Event deleted successully!' });
    })
}

// update event
exports.updateEvent = (req, res) => {
    const eventReqData = new eventModel(req.body);
    console.log('eventReqData update:', eventReqData);
    console.log('req.params.id:', req.params.id);
    let id = parseInt(req.params.id);
    console.log('id:', id);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        eventModel.updateEvent(id, eventReqData, (err, event) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'Event updated Successfully' })
        })
    }
}

// get events summary
exports.getEventsSummary = (req, res) => {
    eventModel.getEventsSummary((err, events) => {
        // console.log('We are here');
        if (err)
            res.send(err);
        console.log('Events', events);
        res.send(events);
    })
}

// get event by ID
exports.getEventByID = (req, res) => {
    //console.log('get event by id');
    eventModel.getEventByID(req.params.id, (err, event) => {
        if (err)
            res.send(err);
        console.log('single event data', event);
        res.send(event);
    })
}

// get events status for drop down
exports.getEventsStatus = (req, res) => {
    eventModel.getEventsStatus((err, events) => {
        // console.log('We are here');
        if (err)
            res.send(err);
        console.log('Status', events);
        res.send(events);
    })
}

// get events phase for drop down
exports.getEventsPhase = (req, res) => {
    eventModel.getEventsPhase((err, events) => {
        // console.log('We are here');
        if (err)
            res.send(err);
        console.log('Phase', events);
        res.send(events);
    })
}