const jwt = require('jsonwebtoken');
const Event = require('../models/eventModel');
const Phase = require('../models/phaseModel');
const utils = require('../utils/utils');
const auth = require('../controllers/authController')


// Events queries
// =====================================================================
exports.getAll = async (req, res) => {
    try {
        console.log("getAllEvents");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status);
        if (status === 200) {
            const [allEvents] = await Event.getAll();
            console.log("allEvents:", allEvents);
            const [phases] = await Phase.getAllPhase();
            console.log("phases:", phases);

            for (let i = 0; i < allEvents.length; i++) {

                let foundPhase = phases.filter(e => e.idEvent === allEvents[i].idEvent);
                console.log("foundPhase:", i, foundPhase);
                if (foundPhase.length > 0) {
                    allEvents[i].phase = foundPhase;
                    console.log("event+phase:", allEvents[i]);
                } else allEvents[i].phase = null;

            }

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


exports.createNewEvent = async (req, res) => {

    console.log("createNewEvent req.body:", req.body);


    let obj = utils.convertObjToRow(req.body);
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
                res.sendStatus(500).json({ msg: "We have problems with writing event data to database" });
            }

            try {
                const [newPhase] = await Phase.writeEventPhase(eventPhase);
                console.log("result eventPhase:", newPhase);
            } catch (error) {
                console.log("error:", error);
                res.sendStatus(500).json({ msg: "We have problems with writing phase data to database" });
            }

             res.status(200).json({ msg: `Мероприятие успешно создано. idEvent = ${eventRow[0]}` })

        } else {
            res.sendStatus(status).json({ msg: "We have problems with JWT authentication" });
        }
       
    }
    else res.status(400).json(msg);

}

exports.updateEvent = async (req, res) => {

    console.log("updateEvent req.body:", req.body);

    if (utils.validateInputData(req.body)) {

        try {
            console.log("--------------------------------------------")
            console.log("updateEvent req.body:", req.body);

            await auth.authenticateJWT(req, res);

            let myEvent = new Event(req.body);
            console.log("--------------------------------------------")
            console.log("updateEvent myEvent:", myEvent);

            Object.keys(req.body).forEach((key) => {

                if (req.body[key] != null) {
                    myEvent[key] = req.body[key];
                }

            });

            myEvent.createdAt = utils.currentDateTime();
            myEvent.idEvent = req.params.id;

            console.log("--------------------------------------------")
            console.log("updatedEventEvent myEvent:", myEvent);



            const [event] = await Event.updateEvent(myEvent)
            await Phase.createPhase(myEvent.phase)
            // res.status(200).json({ "message": "created" });
            res.status(200).json(event);


        } catch (error) {
            if (!error.statusCode) {
                console.log("error:", error);
                error.statusCode = 500;
                res.status(500).json(error);
            }
        }
    } else res.status(400).json("Не указаны обязательные поля");


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
