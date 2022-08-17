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

        const dateStart = req.body.time.start.slice(0, 10);
        const dateEnd = req.body.time.end.slice(0, 10);
        const diffInMs = new Date(dateEnd) - new Date(dateStart);
        const eventDays = diffInMs / (1000 * 60 * 60 * 24) + 1;

        let date = new Date(dateStart);
        let newDataRowArr = [];

        console.log("eventDays :", eventDays);


        console.log("authentication successfull!");

        req.body.id = utils.createEventId();
        req.body.creator = {};
        req.body.creator.id = userId;
        let destructArr = Event.destructObj(userId, req.body);
        // console.log("destructArr:",destructArr);
        // let obj = utils.convertObjToRow(req.body, "create", userId, null);

        let errMsg = destructArr[0];
        let eventRow = destructArr[1];
        let eventPhase = destructArr[2];
        let bookedEquip = destructArr[3];

        // console.log("obj:", obj);
        // console.log("msg:", msg);
        // console.log("eventRow:", eventRow);
        // console.log("eventPhase:", eventPhase);
        // console.log("bookedEquip:", bookedEquip);


        if (errMsg === null) {

            try {
                // write to `t_events` table
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
            if (eventPhase.length > 0) {
                try {
                    // write to `t_event_phase` table
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

            if (bookedEquip.length > 0) {
                try {
                    // write to `t_event_equipment` table
                    const [bkEquip] = await BookedEquip.setBookedModels(bookedEquip);
                    console.log("result booked equipment:", bkEquip);

                } catch (error) {
                    console.log("error:", error);
                    res.status(500).json({ msg: "We have problems with booked equipment to `t_event_equipment` table" });
                    return {
                        error: true,
                        message: 'Error from database'
                    }
                }
                console.log("bookedEquip:", bookedEquip);


                for (let i = 0; i < eventDays; i++) {

                    bookedEquip.map(item => {
                        item = item.slice(0, 6);
                        item.push(date.toISOString().slice(0, 10));
                        newDataRowArr.push(item);
                    })

                    date.setDate(date.getDate() + 1);
                }

                console.log("newDataRowArr:", newDataRowArr);

                try {
                    // write to `t_booking_calendar` table
                    const [bookedCalendar] = await BookedEquip.writeToBookCalendar(newDataRowArr);
                    console.log("result bookedCalendar:", bookedCalendar);

                } catch (error) {
                    console.log("error:", error);
                    res.status(500).json({ msg: "We have problems with booked equipment to `t_booking_calendar` table" });
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
    let equip;

    if (status.status === 200) {

        try {

            [allEvents] = await Event.getAll();
            console.log("allEvents from db:", allEvents);

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

        try {
            [equip] = await BookedEquip.bookedGetAllModels();
            console.log("booked equip:", equip);
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


            let eventObj = new Event(allEvents[i].idEvent, allEvents[i]);
            // let eventObj = utils.convertRowToObj(allEvents[i]);

            // console.log("eventObj:", eventObj);

            let foundPhase = phases.filter(e => e.idEvent === allEvents[i].idEvent);
            console.log("foundPhase:", i, foundPhase);

            foundPhase = foundPhase.map(item => {
                return item = new Phase(item);
            });

            if (foundPhase.length > 0) {
                eventObj.phase = foundPhase;
            } else eventObj.phase = [];


            let foundEquip = equip.filter(e => e.idEvent === allEvents[i].idEvent);
            console.log("foundEquip:", i, foundEquip);
            foundEquip = foundEquip.map(item => {
                return item = new BookedEquip(item);
            });

            if (foundEquip.length > 0) {
                eventObj.booking = foundEquip;
            } else eventObj.booking = [];

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

        const dateStart = req.body.time.start.slice(0, 10);
        const dateEnd = req.body.time.end.slice(0, 10);
        const diffInMs = new Date(dateEnd) - new Date(dateStart);
        const eventDays = diffInMs / (1000 * 60 * 60 * 24) + 1;

        let date = new Date(dateStart);
        let newDataRowArr = [];
        
        console.log("eventDays :", eventDays);


        console.log("authentication successfull!");

        

        let destructArr = Event.destructObj(userId, req.body);

        let errMsg = destructArr[0];
        let eventRow = destructArr[1];
        let eventPhase = destructArr[2];
        let bookedEquip = destructArr[3];

        // console.log("obj:", obj);
        // console.log("eventRow:", eventRow);
        // console.log("msg:", msg);
        // console.log("eventPhase:", eventPhase);
        // console.log("bookedEquip:", bookedEquip);
        // console.log("eventRow[13]:", eventRow[13]);

        // let unixTime = Date.now();


        if (errMsg === null) {

            try {
                await Event.deleteEvent(req.params.id, userId, unixTime);
                const [newEvent] = await Event.createEvent(eventRow);

                console.log("result newEvent:", newEvent);
                await Event.deletePhase(req.params.id, userId, unixTime);

                if (eventPhase.length > 0) {
                    const [newPhase] = await Phase.writeEventPhase(eventPhase);
                    console.log("result newPhase:", newPhase);
                }
                await Event.deleteEquipment(req.params.id, userId, unixTime);

                if (bookedEquip.length > 0) {
                    const [bkEquip] = await BookedEquip.setBookedModels(bookedEquip);
                    console.log("result booked equipment:", bkEquip);
                }

            } catch (error) {
                console.log("error:", error);
                res.status(500).json({ msg: "We have problems with writing event data to database" });
                return {
                    error: true,
                    message: 'Error from database'
                }
            }

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
    let unixTime = Date.now();

    if (status.status === 200) {

        console.log("authentication successfull!");

        try {
            const [delEvent] = await Event.deleteEvent(req.params.id);
            console.log("delEvent:",delEvent);
            delEvent[0].idUpdatedBy = userId;
            delEvent[0].unixTime = unixTime;
            let delEventRow = Object.values(delEvent[0]);
            console.log("delEventRow:",delEventRow);
            const [newEvent] = await Event.createEvent(delEventRow);
            console.log("result:",newEvent);
            return res.status(200).json(delEvent);


            // await Event.deletePhase(req.params.id, userId, unixTime);
            // await Event.deleteEquipment(req.params.id, userId, unixTime);
        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with deleting event data from database" });
            return {
                error: true,
                message: 'Error from database'
            }
        }

        // res.status(200).json({ msg: `Мероприятие успешно удалено. idEvent = ${req.params.id}` });

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
    console.log("getOneHistory");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);

    if (status.status === 200) {

        try {
            const [event] = await Event.getAllHistory();
            console.log("event:", event);

            let allEventsArr = [];
            for (let i = 0; i < event.length; i++) {
                let eventObj = new Event(event[i].id, event[i]);
                allEventsArr.push(eventObj);

            }
            res.status(200).json(allEventsArr);

        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting event from database" });
        }

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}

exports.getOne = async (req, res) => {
    // let event = {};
    let phases = {};
    let booked = {};
    let eventObj = {};


    console.log("getOne");
    let status = await auth.authenticateJWT(req, res);

    console.log("statusCode:", status);

    if (status.status === 200) {

        try {
            const [event] = await Event.getOne(req.params.id);
            // console.log("event:", event);
            if (event.length < 1) {
                res.status(200).json({ msg: `Мероприятия с id = ${req.params.id} не существует` });
                return;
            }
            eventObj = new Event(req.params.id, event[0]);

            [phases] = await Phase.getOnePhase(req.params.id);
            console.log("phases:", phases);
            [booked] = await BookedEquip.getBookedModelsByEventID(req.params.id);
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
        // eventObj = utils.convertRowToObj(event[0]);

        if (phases.length > 0) {
            eventObj.phase = phases;
            console.log("event+phase:", eventObj);
        } else {
            eventObj.phase = [];
        }

        if (booked.length > 0) {
            console.log("booked before map:", booked);
            booked.map(item => {
                delete item.idEvent;
            })
            console.log("booked after map:", booked);
            eventObj.booking = booked;
            console.log("event+booking:", eventObj);
            console.log("event+booking:", eventObj);
        } else {
            eventObj.booking = [];
        }

        res.status(200).json(eventObj);





    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }

}

exports.getOneHistory = async (req, res) => {
    console.log("getOneHistory");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);

    if (status.status === 200) {

        try {
            const [event] = await Event.getOneHistory(req.params.id);
            console.log("event:", event);
            if (event.length < 1) {
                res.status(200).json({ msg: `Мероприятия с id = ${req.params.id} не существует` });
                return;
            }
            let allEventsArr = [];
            for (let i = 0; i < event.length; i++) {
                let eventObj = new Event(event[i].id, event[i]);
                allEventsArr.push(eventObj);

            }
            res.status(200).json(allEventsArr);

        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting event from database" });
        }

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }

}








