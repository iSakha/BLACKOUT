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
            obj.requireQtt = req.body[0].model[i].qtt;
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

    const diffInMs = new Date(dateEnd) - new Date(dateStart)
    const eventDays = diffInMs / (1000 * 60 * 60 * 24) + 1;

    console.log("eventDays :", eventDays);
    let date = new Date(dateStart);
    // add a day
    date.setDate(date.getDate() + 1);
    let newDataRowArr = [];
    for (let i = 0; i < eventDays; i++) {

        for (let j = 0; j < dataRow.length; j++) {
            console.log("dataRow.length:",dataRow.length);
            console.log(date.toISOString().slice(0, 10));
            let row = dataRow[j];
            row = row.slice(0,4);
            row.unshift(date.toISOString().slice(0, 10));
            newDataRowArr.push(row);
            // dataRow[j].pop();
            // dataRow[j].push(date.toISOString().slice(0, 10));
            console.log("dataRow:",dataRow[j]);


        }

        date.setDate(date.getDate() + 1);
    }

    console.log("newDataRowArr:",newDataRowArr);

    try {
        const [equipPerDay] = await BookedEquip.writeToBookCalendar(newDataRowArr);
        console.log("equipPerDay:", equipPerDay);
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