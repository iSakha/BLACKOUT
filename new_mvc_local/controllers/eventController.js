const jwt = require('jsonwebtoken');
const Event = require('../models/eventModel');
const Phase = require('../models/phaseModel');
const BookedEquip = require('../models/bookingModel')
const utils = require('../utils/utils');
const auth = require('../controllers/authController');


// Events queries
// =====================================================================

exports.createNewEvent = async (req, res) => {

    console.log("createNewEvent req.body:", req.body);

    let status = await auth.authenticateJWT(req, res);
    let userId = status.id;

    if (status.status === 200) {

        console.log("authentication successfull!");


        let obj = utils.convertObjToRow(req.body, "create", userId, null);

        let msg = obj[0];
        let eventRow = obj[1];
        let eventPhase = obj[2];

        console.log("obj:", obj);
        console.log("eventRow:", eventRow);
        console.log("msg:", msg);
        console.log("eventPhase:", eventPhase);

        if (msg === null) {

            try {
                const [newEvent] = await Event.createEvent(eventRow);
                console.log("result newEvent:", newEvent);
            } catch (error) {
                console.log("error:", error);
                res.status(500).json({ msg: "We have problems with writing event data to database" });
                return {
                    error: true,
                    message: 'Error from database'
                }
            }
            if (eventPhase !== null) {
                try {
                    const [newPhase] = await Phase.writeEventPhase(eventPhase);
                    console.log("result eventPhase:", newPhase);
                } catch (error) {
                    console.log("error:", error);
                    res.status(500).json({ msg: "We have problems with writing phase data to database" });
                    return {
                        error: true,
                        message: 'Error from database'
                    }
                }
            }

            res.status(200).json({ msg: `Мероприятие успешно создано. idEvent = ${eventRow[0]}` });

        } else res.status(400).json(msg);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}

exports.getAll = async (req, res) => {

    console.log("getAllEvents");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);

    let allEventsArr = [];
    let allEvents;
    let phases;

    if (status.status === 200) {

        try {

            [allEvents] = await Event.getAll();
            console.log("allEvents:", allEvents);

        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting event data from database" });
            return {
                error: true,
                message: 'Error from database'
            }
        }


        try {
            [phases] = await Phase.getAllPhase();
            console.log("phases:", phases);
        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting phase data from database" });
            return {
                error: true,
                message: 'Error from database'
            }
        }

        for (let i = 0; i < allEvents.length; i++) {

            console.log("==================================================================");
            console.log("allEvents.length:", allEvents.length);


            let eventObj = utils.convertRowToObj(allEvents[i]);

            console.log("eventObj:", eventObj);

            let foundPhase = phases.filter(e => e.idEvent === allEvents[i].idEvent);
            console.log("foundPhase:", i, foundPhase);

            if (foundPhase.length > 0) {
                eventObj.phase = foundPhase;
            } else eventObj.phase = null;

            allEventsArr.push(eventObj);
        }
        console.log("==================================================================");
        console.log("allEventsArr:", allEventsArr);

        res.status(200).json(allEventsArr);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }


}

exports.updateEvent = async (req, res) => {

    console.log("update Event req.body:", req.body);

    let status = await auth.authenticateJWT(req, res);
    let userId = status.id;

    if (status.status === 200) {

        console.log("authentication successfull!");


        let obj = utils.convertObjToRow(req.body, "update", userId, req.params.id);

        let msg = obj[0];
        let eventRow = obj[1];
        let eventPhase = obj[2];

        console.log("obj:", obj);
        console.log("eventRow:", eventRow);
        console.log("msg:", msg);
        console.log("eventPhase:", eventPhase);


        if (msg === null) {

            try {
                const [newEvent] = await Event.createEvent(eventRow);
                console.log("result newEvent:", newEvent);
            } catch (error) {
                console.log("error:", error);
                res.status(500).json({ msg: "We have problems with writing event data to database" });
                return {
                    error: true,
                    message: 'Error from database'
                }
            }
            if (eventPhase !== null) {
                try {
                    const [newPhase] = await Phase.updateEventPhase(eventPhase);
                    console.log("result eventPhase:", newPhase);
                } catch (error) {
                    console.log("error:", error);
                    res.status(500).json({ msg: "We have problems with writing phase data to database" });
                    return {
                        error: true,
                        message: 'Error from database'
                    }
                }
            }
            // res.status(200).json({ msg: `Мероприятие успешно обновлено.` });
            res.status(200).json({ msg: `Мероприятие успешно обновлено. idEvent = ${eventRow[0]}` });

        } else res.status(400).json(msg);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}

exports.deleteEvent = async (req, res) => {

    console.log("delete Event req.body:", req.body);

    let status = await auth.authenticateJWT(req, res);
    let userId = status.id;

    if (status.status === 200) {

        console.log("authentication successfull!");


        let obj = {}

        obj.idEvent = req.params.id;
        obj.idWarehouse = 1;
        obj.title = "delete";
        obj.idManager_1 = 1;
        obj.idManager_2 = 1;
        obj.idEventCity = 1;
        obj.idEventPlace = 1;
        obj.idClient = 1;
        obj.idCreatedBy = 1;
        obj.notes = "";
        obj.idStatus = 1;
        obj.idPhase = 1;
        obj.idUpdatedBy = userId;
        obj.is_deleted = 1;

        try {
            await Event.deleteEvent(obj);
        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with deleting event data from database" });
            return {
                error: true,
                message: 'Error from database'
            }
        }

        res.status(200).json({ msg: `Мероприятие успешно удалено. idEvent = ${req.params.id}` });

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}

exports.getSummary = async (req, res) => {

    console.log("getSummary");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);

    if (status.status === 200) {

        try {

            [summary] = await Event.getSummary();
            console.log("summary:", summary);

        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting summary data from database" });
            return {
                error: true,
                message: 'Error from database'
            }
        }

        res.status(200).json(summary);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }

}
// =====================================================================


exports.getAllHistory = async (req, res) => {
    // try {
    //     console.log("getAllEvents");
    //     let status = await auth.authenticateJWT(req, res);
    //     console.log("statusCode:", status);
    //     if (status === 200) {
    //         const [allEvents] = await Event.getAllHistory();
    //         res.json(allEvents);
    //     } else {
    //         res.sendStatus(status);
    //     }

    // } catch (error) {
    //     if (!error.statusCode) {
    //         error.statusCode = 500;
    //     }
    // }
}

exports.getOne = async (req, res) => {
    let event = {};
    let phases = {};
    let booked = {};
    let subBooked = {};
    let eventObj = {};
     

    console.log("getOne");
    let status = await auth.authenticateJWT(req, res);

    console.log("statusCode:", status);

    if (status.status === 200) {

        try {
            [event] = await Event.getOne(req.params.id);
            console.log("event:", event);
            console.log("idWarehouse:",event[0].idWarehouse);
            [phases] = await Phase.getOnePhase(req.params.id);
            console.log("phases:", phases);
            [booked] = await BookedEquip.getBookedModelsByEventIDwhID(req.params.id, event[0].idWarehouse);
            console.log("booked:", booked);
        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting event from database" });
            return {
                error: true,
                message: 'Error from database'
            }
        }

        // go to constructor
        eventObj = utils.convertRowToObj(event[0]);

        if (phases.length > 0) {
            eventObj.phase = phases;
            console.log("event+phase:", eventObj);
        }

        if (booked.length > 0) {
            let newItemArr = [];
            booked.map(item => {
                
                let newItem = {};
                newItem.id = item.idFixture.slice(0,11);
                newItem.qtt = item.whsQty;

                // console.log("newItem.id:",newItem.id);

                newItemArr.push(newItem);

            })
            
            eventObj.booking = newItemArr;
            console.log("event+booking:", eventObj);
        }

        res.json(eventObj);





    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }

}

exports.getOneHistory = async (req, res) => {
    // try {
    //     console.log("getOneHistory");
    //     let status = await auth.authenticateJWT(req, res);
    //     console.log("statusCode:", status);
    //     if (status === 200) {
    //         const [event] = await Event.getOneHistory(req.params.id);
    //         res.json(event);
    //     } else {
    //         res.sendStatus(status);
    //     }

    // } catch (error) {
    //     if (!error.statusCode) {
    //         error.statusCode = 500;
    //     }
    // }
}








