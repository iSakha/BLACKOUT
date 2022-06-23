const jwt = require('jsonwebtoken');
const Event = require('../models/eventModel');
const Phase = require('../models/phaseModel');
const utils = require('../utils/utils');
const auth = require('../controllers/authController')


// Events queries
// =====================================================================

exports.createNewEvent = async (req, res) => {

    console.log("createNewEvent req.body:", req.body);

    let status = await auth.authenticateJWT(req, res);
    let userId = status.id;

    if (status.status === 200) {

        console.log("authentication successfull!");


        let obj = utils.convertObjToRow(req.body, "create", userId);

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
            }
            if (eventPhase !== null) {
                try {
                    const [newPhase] = await Phase.writeEventPhase(eventPhase);
                    console.log("result eventPhase:", newPhase);
                } catch (error) {
                    console.log("error:", error);
                    res.status(500).json({ msg: "We have problems with writing phase data to database" });
                }
            }

            res.status(200).json({ msg: `Мероприятие успешно создано. idEvent = ${eventRow[0]}` });

        }else res.status(400).json(msg);

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

    if (status === 200) {

        try {

            [allEvents] = await Event.getAll();
            console.log("allEvents:", allEvents);

        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting event data from database" });
        }


        try {
            [phases] = await Phase.getAllPhase();
            console.log("phases:", phases);
        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting phase data from database" });
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
        res.status(status).json({ msg: "We have problems with JWT authentication" });
    }


}

exports.updateEvent = async (req, res) => {

    console.log("update Event req.body:", req.body);

    let obj = utils.convertObjToRow(req.body,"update");

    let msg = obj[0];
    let eventRow = obj[1];
    let eventPhase = obj[2];

    console.log("obj:", obj);
    console.log("eventRow:", eventRow);
    console.log("msg:", msg);
    console.log("eventPhase:", eventPhase);

    if (msg === null) {

        let status = await auth.authenticateJWT(req, res);

        if (status === 200) {

            console.log("authentication successfull!");

            try {
                const [newEvent] = await Event.createEvent(eventRow);
                console.log("result newEvent:", newEvent);
            } catch (error) {
                console.log("error:", error);
                res.status(500).json({ msg: "We have problems with writing event data to database" });
            }
            if (eventPhase !== null) {
                try {
                    const [newPhase] = await Phase.writeEventPhase(eventPhase);
                    console.log("result eventPhase:", newPhase);
                } catch (error) {
                    console.log("error:", error);
                    res.status(500).json({ msg: "We have problems with writing phase data to database" });
                }
            }


            res.status(200).json({ msg: `Мероприятие успешно создано. idEvent = ${eventRow[0]}` })

        } else {
            res.status(status).json({ msg: "We have problems with JWT authentication" });
        }

    }
    else res.status(400).json(msg);
}
// =====================================================================


exports.getAllHistory = async (req, res) => {
    try {
        console.log("getAllEvents");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status);
        if (status === 200) {
            const [allEvents] = await Event.getAllHistory();
            res.json(allEvents);
        } else {
            res.sendStatus(status);
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }
}

exports.getOne = async (req, res) => {
    try {
        console.log("getOne");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status);
        if (status === 200) {
            const [event] = await Event.getOne(req.params.id);
            console.log("event:", event);
            const [phases] = await Phase.getOnePhase(req.params.id);
            console.log("phases:", phases);

            // let foundPhase = phases.filter(e => e.idEvent === event.idEvent);
            // console.log("foundPhase:", i, foundPhase);
            if (phases.length > 0) {
                event.phase = phases;
                console.log("event+phase:", event);
            } else event.phase = null;

            res.json(event);

        } else {
            res.sendStatus(status);
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }
}

exports.getOneHistory = async (req, res) => {
    try {
        console.log("getOneHistory");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status);
        if (status === 200) {
            const [event] = await Event.getOneHistory(req.params.id);
            res.json(event);
        } else {
            res.sendStatus(status);
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }
}







exports.getSummary = async (req, res) => {
    try {
        console.log("getSummary");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status);
        if (status === 200) {
            const [summary] = await Event.getSummary();
            console.log(summary);
            res.status(200).json(summary);
        } else {
            res.sendStatus(status);
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }

}
