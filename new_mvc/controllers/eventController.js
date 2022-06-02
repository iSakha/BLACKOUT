const Event = require('../models/eventModel');
const utils = require('../utils/utils');
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'greatSecretForTokenAccessWith#-~';
const refreshTokenSecret = 'someRandomNewStringForRefreshTokenWithout~#-';



async function authenticateJWT(req, res) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            // next();
        });
    } else {
        res.sendStatus(401);
    }
};



exports.getAllEvents = async (req, res) => {
    try {
        let status = await authenticateJWT(req, res);
        console.log("statusCode:", status);
        const [allEvents] = await Event.getAll();
        res.json(allEvents);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }
}
// exports.getAllEvents = async (req, res) => {
//     try {
//         let result = await authenticateJWT(req, res);
//         console.log("result:", result);
//         if (result == "Expired!") {
//             res.status(200).json({ "message": "Token expired!" });
//         }
//         const [allEvents] = await Event.getAll();
//         res.status(200).json(allEvents);
//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//     }
// }

exports.createNewEvent = async (req, res) => {

    if (utils.validateInputData(req.body)) {

        try {
            console.log("req.body:", req.body);
            await authenticateJWT(req, res);

            // res.setHeader("Access-Control-Allow-Origin", "*");
            // res.setHeader("Access-Control-Allow-Methods", "PUT,GET,DELETE,PATCH, POST");
            // res.setHeader("Access-Control-Allow-Credentials", true);
            // res.setHeader(
            //     "Access-Control-Allow-Headers",
            //     "X-Requested-With,content-type,Origin,Accept,Authorization"
            // );

            let myEvent = new Event(req.body);
            console.log("myEvent:", myEvent);

            Object.keys(req.body).forEach((key) => {

                myEvent[key] = req.body[key];

            });

            myEvent.createdAt = utils.currentDateTime();
            myEvent.idEvent = utils.createEventId();

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