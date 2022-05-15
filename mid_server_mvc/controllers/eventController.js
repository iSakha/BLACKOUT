const mysql = require("mysql2");
let config = require('../config/config.js');
const eventModel = require('../models/eventModel.js');

// get all events list
exports.getEvents = (req, res) => {
    //console.log('here all employees list');

    eventModel.getEvents((err, events) => {
        if (err) {
            res.send("getEvents error:", err);
            console.log('Events', events);
            res.send(events)
        }

    })

    try {
        eventModel.getEvents((err, events) => {
            console.log('getEvents from controller');
            if (err){res.send(err);}
            console.log('Events', events);
            res.send(events)
        })
    } catch (error) {
        console.log('error:', error);
    }

}

// create new event
exports.createNewEvent = (req, res) => {

    const eventReqData = new eventModel(req.body);
    // console.log('eventReqData', eventReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {

        eventModel.createEvent(eventReqData, (err, event) => {
            if (err)
                res.send("createEvent error:", err);
            res.json({ status: true, message: 'Event Created Successfully' })
            // res.json({status: true, message: 'Event Created Successfully',data: event.insertId})
        })
        // res.json({status: true, message: 'Event Created Successfully'})

        try {
            eventModel.createEvent(eventReqData, (err, event) => {
                if (err)
                    res.send(err);
                res.json(eventReqData);
                // res.json({status: true, message: 'Event Created Successfully',data: event.insertId})
            })
        } catch (error) {
            console.log('error:', error);
        }
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
            res.send("deleteEvent error:", err);
        res.json({ success: true, message: 'Event deleted successully!' });
    })

    try {
        eventModel.deleteEvent(id, (err, event) => {
            if (err)
                res.send(err);
            res.json({ success: true, message: 'Event id=' + id + 'deleted successully!' });
        })
    } catch (error) {
        console.log('error:', error);
    }

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
                res.send("updateEvent error:", err);
            res.json({ status: true, message: 'Event updated Successfully' })
        })

        try {
            eventModel.updateEvent(id, eventReqData, (err, event) => {
                if (err)
                    res.send(err);
                // res.json({ status: true, message: 'Event updated Successfully' })
                res.json(eventReqData);
            })
        } catch (error) {
            console.log('error:', error);
        }

    }
}

// get events summary
exports.getEventsSummary = (req, res) => {

    eventModel.getEventsSummary((err, events) => {
        // console.log('We are here');
        if (err)
            res.send("getEventsSummary error:", err);
        console.log('Events', events);
        res.send(events);
    })

    try {
        eventModel.getEventsSummary((err, events) => {
            // console.log('We are here');
            if (err)
                res.send(err);
            console.log('Events', events);
            res.send(events);
        })
    } catch (error) {
        console.log('error:', error);
    }


}

// get event by ID
exports.getEventByID = (req, res) => {
    //console.log('get event by id');

    eventModel.getEventByID(req.params.id, (err, event) => {
        if (err)
            res.send("getEventByID error:", err);
        console.log('single event data', event);
        res.send(event);
    })

    try {
        eventModel.getEventByID(req.params.id, (err, event) => {
            if (err)
                res.send(err);
            console.log('single event data', event);
            res.send(event);
        })
    } catch (error) {
        console.log('error:', error);
    }


}

// get events status for drop down
exports.getEventsStatus = (req, res) => {
    try {
        eventModel.getEventsStatus((err, events) => {
            // console.log('We are here');
            if (err)
                res.send("getEventsStatus error:", err);
            console.log('Status', events);
            res.send(events);
        })
    } catch (error) {
        console.log('error:', error);
    }

}

// get events phase for drop down
exports.getEventsPhase = (req, res) => {
    try {
        eventModel.getEventsPhase((err, events) => {
            // console.log('We are here');
            if (err)
                res.send("getEventsPhase error:", err);
            console.log('Phase', events);
            res.send(events);
        })
    } catch (error) {
        console.log('error:', error);
    }

}

// get events locations
exports.getEventLocations = (req, res) => {
    try {
        eventModel.getEventLocations((err, locations) => {
            // console.log('We are here');
            if (err)
                res.send("getEventLocations error:", err);
            console.log('Locations', locations);
            res.send(locations);
        })
    } catch (error) {
        console.log('error:', error);
    }

}