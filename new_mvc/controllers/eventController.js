const Event = require('../models/eventModel');
const utils = require('../utils/utils');
const jwt = require('jsonwebtoken');
const Phase = require('../models/phaseModel');

const accessTokenSecret = 'greatSecretForTokenAccessWith#-~';
const refreshTokenSecret = 'someRandomNewStringForRefreshTokenWithout~#-';

const authenticateJWT = (req, res) => {
    const authHeader = req.headers.authorization;
    let status;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                status = 403;
                // return res.sendStatus(403);
            } else {
                status = 200;
                req.user = user;
            }

            // next();
        });
    } else {
        status = 401;
        // res.sendStatus(401);
    }
    return status;
};

exports.getAllLatest = async (req, res) => {
    try {
        console.log("getAllEvents");
        let status = await authenticateJWT(req, res);
        console.log("statusCode:", status);
        if (status === 200) {
            const [allEvents] = await Event.getAllLatest();
            console.log("allEvents:", allEvents);
            const [phases] = await Phase.getAllPhase();
            console.log("phases:", phases);

            for (let i = 0; i < allEvents.length; i++) {

                let foundPhase = phases.filter(e => e.idEvent === allEvents[i].idEvent);
                console.log("foundPhase:",i,foundPhase);
                if(foundPhase.length > 0) {
                    allEvents[i].phase = foundPhase
                }else allEvents[i].phase = null;

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

exports.getAll = async (req, res) => {
    try {
        console.log("getAllEvents");
        let status = await authenticateJWT(req, res);
        console.log("statusCode:", status);
        if (status === 200) {
            const [allEvents] = await Event.getAll();
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
        let status = await authenticateJWT(req, res);
        console.log("statusCode:", status);
        if (status === 200) {
            const [event] = await Event.getOne(req.params.id);
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
        let status = await authenticateJWT(req, res);
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

    if (utils.validateInputData(req.body)) {

        try {
            console.log("--------------------------------------------")
            console.log("createNewEvent req.body:", req.body);

            await authenticateJWT(req, res);

            // res.setHeader("Access-Control-Allow-Origin", "*");
            // res.setHeader("Access-Control-Allow-Methods", "PUT,GET,DELETE,PATCH, POST");
            // res.setHeader("Access-Control-Allow-Credentials", true);
            // res.setHeader(
            //     "Access-Control-Allow-Headers",
            //     "X-Requested-With,content-type,Origin,Accept,Authorization"
            // );

            let myEvent = new Event(req.body);
            console.log("--------------------------------------------")
            console.log("createNewEvent myEvent:", myEvent);

            Object.keys(req.body).forEach((key) => {

                if (req.body[key] != null) {
                    myEvent[key] = req.body[key];
                }


            });

            myEvent.createdAt = utils.currentDateTime();
            myEvent.idEvent = utils.createEventId();

            console.log("--------------------------------------------")
            console.log("createNewEvent myEvent:", myEvent);

            const [newEvent] = await Event.createEvent(myEvent);
            // res.status(200).json({ "message": "created" });
            res.status(200).json(newEvent);


        } catch (error) {
            if (!error.statusCode) {
                console.log("error:", error);
                error.statusCode = 500;
                res.status(500).json(error);
            }
        }
    } else res.status(400).json("Не указаны обязательные поля");


}

exports.updateEvent = async (req, res) => {

    console.log("updateEvent req.body:", req.body);

    if (utils.validateInputData(req.body)) {

        try {
            console.log("--------------------------------------------")
            console.log("updateEvent req.body:", req.body);

            await authenticateJWT(req, res);

            // res.setHeader("Access-Control-Allow-Origin", "*");
            // res.setHeader("Access-Control-Allow-Methods", "PUT,GET,DELETE,PATCH, POST");
            // res.setHeader("Access-Control-Allow-Credentials", true);
            // res.setHeader(
            //     "Access-Control-Allow-Headers",
            //     "X-Requested-With,content-type,Origin,Accept,Authorization"
            // );

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

exports.getLocations = async (req, res) => {
    try {
        const [locations] = await Event.getLocations();
        console.log(locations);
        res.status(200).json(locations);
    } catch (error) {
        if (!error.statusCode) {
            // error.statusCode = 500;
            res.status(500).json(error);
        }
    }
}

exports.getClients = async (req, res) => {
    try {
        const [clients] = await Event.getClients();
        console.log(clients);
        res.status(200).json(clients);
    } catch (error) {
        if (!error.statusCode) {
            // error.statusCode = 500;
            res.status(500).json(error);
        }
    }
}

exports.getManagers = async (req, res) => {
    try {
        const [users] = await Event.getUsers();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        if (!error.statusCode) {
            // error.statusCode = 500;
            res.status(500).json(error);
        }
    }
}

exports.getStatus = async (req, res) => {
    try {
        const [status] = await Event.getStatus();
        console.log(status);
        res.status(200).json(status);
    } catch (error) {
        if (!error.statusCode) {
            // error.statusCode = 500;
            res.status(500).json(error);
        }
    }
}

exports.getPhases = async (req, res) => {
    try {
        console.log("getPhases");
        let status = await authenticateJWT(req, res);
        console.log("statusCode:", status);
        if (status === 200) {
            const [phase] = await Event.getPhases();
            res.json(phase);
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
        const [summary] = await Event.getSummary();
        console.log(summary);
        res.status(200).json(summary);
    } catch (error) {
        if (!error.statusCode) {
            // error.statusCode = 500;
            res.status(500).json(error);
        }
    }
}