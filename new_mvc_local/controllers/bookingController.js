const jwt = require('jsonwebtoken');
const BookedEquip = require('../models/bookingModel');
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
        console.log("req.body[0].model:",req.body[0].model);
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
        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with writing booked equipment to database" });
            return {
                error: true,
                message: 'Error from database'
            }
        }

        res.status(200).json({ msg: `Оборудование для мероприятия выбрано.` });

        // } else res.status(400).json(msg);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}