const jwt = require('jsonwebtoken');
const BookedEquip = require('../models/bookingModel');
const Event = require('../models/eventModel');
const Phase = require('../models/phaseModel');
const utils = require('../utils/utils');
const auth = require('../controllers/authController');


exports.setBookedModels = async (req, res) => {

    console.log("getBookingModels req.body:", req.body);

    let status = await auth.authenticateJWT(req, res);
    let userId = status.id;
    let dataRow = [];
    let unixTime = Date.now();



    if (status.status === 200) {

        console.log("authentication successfull!");
        let obj = {};
        console.log("req.body[0].model:", req.body[0].model);
        for (let i = 0; i < req.body[0].model.length; i++) {
            console.log("test");
            // let obj = new EventEquip(req.body[i].idEvent, req.body[i].idFixture, req.body[i].requiredQty, req.body[i].idWarehouse, req.body[i].whsQty);
            // 
            // 

            obj.idEvent = req.body[0].event.id;
            obj.idModel = req.body[0].model[i].id + ".0000";
            obj.modelQtt = req.body[0].model[i].qtt;
            obj.idWhOut = req.body[0].warehouseOut.id;
            obj.userId = userId;
            obj.unixTime = unixTime;
            const objRow = Object.values(obj);


            dataRow.push(objRow);
        }

        console.log("dataRow:", dataRow);

        try {
            const [bookedEquip] = await BookedEquip.setBookedModels(dataRow);
            console.log("bookedEquip:", bookedEquip);

            try {
                const [event] = await Event.getOne(req.body[0].event.id);
                console.log("event:", event);
                // [phases] = await Phase.getOnePhase(req.params.id);
                // console.log("phases:", phases);

                updateBookingCalendar(dataRow, res, event[0].start.toISOString().slice(0, 10), event[0].end.toISOString().slice(0, 10));

            } catch (error) {
                console.log("error:", error);
                res.status(500).json({ msg: "We have problems with getting event from database" });
                return {
                    error: true,
                    message: 'Error from database'
                }
            }


        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with writing booked equipment to database" });
            return {
                error: true,
                message: 'Error from database'
            }
        }



        // } else res.status(400).json(msg);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}

updateBookingCalendar = async (dataRow, res, dateStart, dateEnd) => {

    console.log("updateBookingCalendar");
    console.log("start:", dateStart);
    console.log("end:", dateEnd);
    console.log("dataRow:", dataRow);

    const diffInMs = new Date(dateEnd) - new Date(dateStart)
    const eventDays = diffInMs / (1000 * 60 * 60 * 24) + 1;

    console.log("eventDays :", eventDays);
    let date = new Date(dateStart);
    // add a day
    date.setDate(date.getDate() + 1);
    let newDataRowArr = [];
    for (let i = 0; i < eventDays; i++) {
        console.log("dataRow.length:", dataRow.length);
        for (let j = 0; j < dataRow.length; j++) {

            // console.log(date.toISOString().slice(0, 10));
            let row = dataRow[j];
            row = row.slice(0, 4);
            row.unshift(date.toISOString().slice(0, 10));
            newDataRowArr.push(row);
            dataRow[j].pop();
            dataRow[j].push(date.toISOString().slice(0, 10));
            console.log("dataRow:", dataRow[j]);


        }

        date.setDate(date.getDate() + 1);
    }

    console.log("newDataRowArr:", newDataRowArr);

    try {
        const [equipPerDay] = await BookedEquip.writeToBookCalendar(newDataRowArr);
        // console.log("equipPerDay:", equipPerDay);
        return res.status(200).json({ msg: `Оборудование добавлено в календарь` });
    } catch (error) {
        console.log("error:", error);
        res.status(500).json({ msg: "We have problems with writing data to Booking Calendar" });
        return {
            error: true,
            message: 'Error from database'
        }
    }


}

exports.getBookedModelsByEventID = async (req, res) => {

    console.log("getBookedModelsByEventID", req.params.id);

    let status = await auth.authenticateJWT(req, res);

    if (status.status === 200) {

        console.log("authentication successfull!");

        try {
            const [bookedEventEquip] = await BookedEquip.getBookedModelsByEventID(req.params.id);
            console.log("bookedEquip:", bookedEventEquip);

            return res.status(200).json(bookedEventEquip);
        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting booked equipment from database" });
            return {
                error: true,
                message: 'Error from database'
            }
        }

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}

exports.deleteModelsByEventID = async (req, res) => {

    console.log("deleteModelsByEventID", req.params.id);

    let status = await auth.authenticateJWT(req, res);

    if (status.status === 200) {

        console.log("authentication successfull!");

        try {
            const [delEventEquip] = await BookedEquip.deleteModelsByEventID_1(req.params.id);
            try {
                const [delEquip] = await BookedEquip.deleteModelsByEventID_2(req.params.id);
                return res.status(200).json({ msg: `Оборудование удалено` });
            } catch (error) {
                console.log("error:", error);
                res.status(500).json({ msg: "We have problems with deleting booked equipment from t_booking_calendar table" });
                return {
                    error: true,
                    message: 'Error from database'
                }
            }
        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with deleting booked equipment from t_event_equipment table" });
            return {
                error: true,
                message: 'Error from database'
            }
        }

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}


exports.bookedEquipGetAll = async (req, res) => {

    console.log("deleteModelsByEventID", req.params.id);

    let status = await auth.authenticateJWT(req, res);

    if (status.status === 200) {

        console.log("authentication successfull!");

        try {
            const [allBookedEquip] = await BookedEquip.bookedGetAllModels();
            console.log("allBookedEquip:",allBookedEquip);
            return res.status(200).json(allBookedEquip);
        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting all booked equipment from `v_booked_equip` table" });
            return {
                error: true,
                message: 'Error from database'
            }
        }

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}

exports.getEvents = async (req, res) => {

    console.log("deleteModelsByEventID", req.params.id);

    let status = await auth.authenticateJWT(req, res);

    if (status.status === 200) {

        console.log("authentication successfull!");

        try {
            const [events] = await BookedEquip.getEvents();
            console.log("events:",events);
            return res.status(200).json(events);
        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting events from `v_booked_equip` table" });
            return {
                error: true,
                message: 'Error from database'
            }
        }

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}

exports.getBookedEquipOnInterval = async (req, res) => {

    console.log("getBookedEquipOnInterval", req.body.start);

    let status = await auth.authenticateJWT(req, res);

    if (status.status === 200) {

        console.log("authentication successfull!");

        try {
            const [equip] = await BookedEquip.getBookedEquipOnInterval(req.body.start,req.body.end);
            console.log("equip:",equip);
            return res.status(200).json(equip);
        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting equipment on interval from `v_booked_equip` table" });
            return {
                error: true,
                message: 'Error from database'
            }
        }

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}

exports.getBookedEquipOnDate = async (req, res) => {

    console.log("getBookedEquipOnInterval", req.body.start);

    let status = await auth.authenticateJWT(req, res);

    if (status.status === 200) {

        console.log("authentication successfull!");

        try {
            const [equip] = await BookedEquip.getBookedEquipOnInterval(req.body.start,req.body.start);
            console.log("equip:",equip);
            return res.status(200).json(equip);
        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting equipment on interval from `v_booked_equip` table" });
            return {
                error: true,
                message: 'Error from database'
            }
        }

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}