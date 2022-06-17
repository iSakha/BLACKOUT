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


    // if (utils.validateInputData(req.body)) {

    //     try {
    //         console.log("--------------------------------------------")
    //         // console.log("createNewEvent req.body:", req.body);

    //         let status = await auth.authenticateJWT(req, res);

    //         if (status === 200) {
    //             let myEvent = new Event(req.body);
    //             console.log("--------------------------------------------")
    //             console.log("createNewEvent myEvent:", myEvent);

    //             Object.keys(req.body).forEach((key) => {

    //                 if (req.body[key] != null) {
    //                     myEvent[key] = req.body[key];
    //                 }


    //             });

    //             delete myEvent.phase;

    //             console.log("req.body.phase:", req.body.phase);
    //             console.log("--------------------------------------------");
    //             console.log("req.body.phase.length:", req.body.phase.length);
    //             console.log("--------------------------------------------");

    //             myEvent.createdAt = utils.currentDateTime();
    //             myEvent.idEvent = utils.createEventId();
    //             myEvent.unixTime = Date.now();

    //             if (req.body.phase.length > 0) {

    //                 for (let i = 0; i < req.body.phase.length; i++) {
    //                     myEvent.idPhase = req.body.phase[i].idPhase;
    //                     myEvent.phaseTimeStart = req.body.phase[i].startPhase;
    //                     myEvent.phaseTimeEnd = req.body.phase[i].endPhase;

    //                     await Event.createEvent(myEvent);

    //                 }

    //                 for (let i = 0; i < req.body.phase.length; i++) {
    //                     myEvent.idPhase = req.body.phase[i].idPhase;
    //                     myEvent.phaseTimeStart = req.body.phase[i].startPhase;
    //                     myEvent.phaseTimeEnd = req.body.phase[i].endPhase;

    //                     let oPhase = {};
    //                     oPhase.idEvent = myEvent.idEvent;
    //                     oPhase.idPhase = myEvent.idPhase;
    //                     oPhase.startPhase = myEvent.phaseTimeStart;
    //                     oPhase.endPhase = myEvent.phaseTimeEnd;

    //                     await Phase.writeEventPhase(oPhase);
    //                     console.log("oPhase:", oPhase);

    //                 }



    //                 let msg = {};
    //                 msg.result = `Мероприятие успешно создано. idEvent = ${myEvent.idEvent}`
    //                 res.status(200).json(msg);

    //             } else {


    //                 console.log("--------------------------------------------")
    //                 console.log("createNewEvent myEvent:", myEvent);

    //                 const [newEvent] = await Event.createEvent(myEvent);
    //                 // res.status(200).json({ "message": "created" });
    //                 let msg = {};
    //                 msg.result = `Мероприятие успешно создано. idEvent = ${myEvent.idEvent}`
    //                 res.status(200).json(msg);
    //                 // res.status(200).json(newEvent);
    //             }


    //         } else {
    //             res.sendStatus(status);
    //         }




    //     } catch (error) {
    //         if (!error.statusCode) {
    //             console.log("error:", error);
    //             error.statusCode = 500;
    //             res.status(500).json(error);
    //         }
    //     }

    // } else res.status(400).json(req.body);
    // } else res.status(400).json("Не указаны обязательные поля", req.body);
    res.status(200).json({ msg: "OK" });

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
