const Event = require('../models/eventModel');

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
        console.log("req.body:",req.body);
        // res.setHeader("Access-Control-Allow-Origin", "*");
        // res.setHeader("Access-Control-Allow-Methods", "PUT,GET,DELETE,PATCH, POST");
        // res.setHeader("Access-Control-Allow-Credentials", true);
        // res.setHeader(
        //     "Access-Control-Allow-Headers",
        //     "X-Requested-With,content-type,Origin,Accept,Authorization"
        // );
        
        // let itemObj = { id: 4, item: "cheese" };
        const [newEvent] = await Event.createEvent(req.body);
        // res.status(200).json({ "message": "created" });
        res.status(200).json(newEvent);


    } catch (error) {
        if (!error.statusCode) {
            console.log("error:",error);
            error.statusCode = 500;
        }
    }
}