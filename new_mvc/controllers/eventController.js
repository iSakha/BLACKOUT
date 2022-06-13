const jwt = require('jsonwebtoken');
const Event = require('../models/eventModel');
const Phase = require('../models/phaseModel');
const utils = require('../utils/utils');
const auth = require('../controllers/authController')


// const accessTokenSecret = 'greatSecretForTokenAccessWith#-~';
// const refreshTokenSecret = 'someRandomNewStringForRefreshTokenWithout~#-';

// const authenticateJWT = (req, res) => {
//     const authHeader = req.headers.authorization;
//     let status;
//     if (authHeader) {
//         const token = authHeader.split(' ')[1];

//         jwt.verify(token, accessTokenSecret, (err, user) => {
//             if (err) {
//                 status = 403;
//             } else {
//                 status = 200;
//                 req.user = user;
//             }
//         });
//     } else {
//         status = 401;
//     }
//     return status;
// };

// Events queries
// =====================================================================
exports.getAllLatest = async (req, res) => {
    try {
        console.log("getAllEvents");
        let status = await auth.authenticateJWT(req, res);
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
        let status = await auth.authenticateJWT(req, res);
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
        let status = await auth.authenticateJWT(req, res);
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

    if (utils.validateInputData(req.body)) {

        try {
            console.log("--------------------------------------------")
            console.log("createNewEvent req.body:", req.body);

            await auth.authenticateJWT(req, res);

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
// Extra queries
// =====================================================================

// // GET
// // =====================================================================
// exports.getLocations = async (req, res) => {

//     try {
//         console.log("getLocations");
//         let status = await authenticateJWT(req, res);
//         console.log("statusCode:", status);
//         if (status === 200) {
//             const [locations] = await Event.getLocations();
//             console.log(locations);
//             res.status(200).json(locations);
//         } else {
//             res.sendStatus(status);
//         }

//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//     }
// }

// exports.getClients = async (req, res) => {
//     try {
//         console.log("getClients");
//         let status = await authenticateJWT(req, res);
//         console.log("statusCode:", status);
//         if (status === 200) {
//             const [clients] = await Event.getClients();
//             console.log(clients);
//             res.status(200).json(clients);
//         } else {
//             res.sendStatus(status);
//         }

//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//     }
// }

// exports.getManagers = async (req, res) => {

//     try {
//         console.log("getManagers");
//         let status = await authenticateJWT(req, res);
//         console.log("statusCode:", status);
//         if (status === 200) {
//             const [users] = await Event.getUsers();
//             console.log(users);
//             res.status(200).json(users);
//         } else {
//             res.sendStatus(status);
//         }

//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//     }

// }

// exports.getStatus = async (req, res) => {

//     try {
//         console.log("getStatus");
//         let status = await authenticateJWT(req, res);
//         console.log("statusCode:", status);
//         if (status === 200) {
//             const [status] = await Event.getStatus();
//             console.log(status);
//             res.status(200).json(status);
//         } else {
//             res.sendStatus(status);
//         }

//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//     }

// }

// exports.getPhases = async (req, res) => {

//     try {
//         console.log("getPhases");
//         let status = await authenticateJWT(req, res);
//         console.log("statusCode:", status);
//         if (status === 200) {
//             const [phase] = await Event.getPhases();
//             console.log(status);
//             res.status(200).json(phase);
//         } else {
//             res.sendStatus(status);
//         }

//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//     }
// }

// exports.getSummary = async (req, res) => {
//     try {
//         console.log("getSummary");
//         let status = await authenticateJWT(req, res);
//         console.log("statusCode:", status);
//         if (status === 200) {
//             const [summary] = await Event.getSummary();
//             console.log(summary);
//             res.status(200).json(summary);
//         } else {
//             res.sendStatus(status);
//         }

//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//     }

// }

// exports.getWarehouses = async (req, res) => {
//     try {
//         console.log("getWarehouses");
//         let status = await authenticateJWT(req, res);
//         console.log("statusCode:", status);
//         if (status === 200) {
//             const [summary] = await Event.getWarehouses();
//             console.log(summary);
//             res.status(200).json(summary);
//         } else {
//             res.sendStatus(status);
//         }

//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//     }

// }

// // CREATE
// // =====================================================================
// exports.newCity = async (req, res) => {
//     console.log("--------------------------------------------")
//     console.log("New City req.body:", req.body);

//     let city = {};
//     city.title = req.body.city;

//     // await authenticateJWT(req, res);
//     console.log("New City:", city);

// }
// // UPDATE
// // =====================================================================

// // DELETE
// // =====================================================================