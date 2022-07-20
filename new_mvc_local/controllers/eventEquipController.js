const jwt = require('jsonwebtoken');
const EventEquip = require('../models/eventEquipModel');
const utils = require('../utils/utils');
const auth = require('../controllers/authController');

exports.addEventEquip = async (req, res) => {

    console.log("addEventEquip req.body:", req.body);

    let status = await auth.authenticateJWT(req, res);
    let userId = status.id;
    let dataRow = [];

    for (let i = 0; i < req.body.length; i++) {
        let obj = new EventEquip(req.body[i].idEvent, req.body[i].idFixture, req.body[i].requiredQty, req.body[i].idWarehouse, req.body[i].whsQty, userId);
        const objRow = Object.values(obj);
        dataRow.push(objRow);
    }

    console.log("dataRow:",dataRow);

    if (status.status === 200) {

        console.log("authentication successfull!");


        // let obj = utils.convertObjToRow(req.body, "create", userId, null);

        // let msg = obj[0];
        // let eventRow = obj[1];
        // let eventPhase = obj[2];

        // console.log("obj:", obj);
        // console.log("eventRow:", eventRow);
        // console.log("msg:", msg);
        // console.log("eventPhase:", eventPhase);

        // if (msg === null) {



        try {
            // const [newEventEquip] = await EventEquip.addEventEquip(dataRow);
            // console.log("result newEventEquip:", newEventEquip);
        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with writing event equipment to database" });
            return {
                error: true,
                message: 'Error from database'
            }
        }

        res.status(200).json({ msg: `Оборудование успешно добавлено.` });

        // } else res.status(400).json(msg);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}