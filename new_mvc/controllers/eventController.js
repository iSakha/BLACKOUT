const Event = require('../models/eventModel');
const utils = require('../utils/utils')

exports.getAllEvents = async (req, res) => {
    try {
        const [allEvents] = await Event.getAll();
        res.status(200).json(allEvents);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }
}

exports.createNewEvent = async (req, res) => {

    try {
        console.log("req.body:", req.body);
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
        let now = utils.currentDateTime();
        myEvent.createdAt = now.toString();


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
}