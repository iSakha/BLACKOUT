const jwt = require('jsonwebtoken');
const EventEquip = require('../models/eventEquipModel');
const utils = require('../utils/utils');
const auth = require('../controllers/authController');

addingEquipmentArr = [];

exports.addEventEquip = async (req, res) => {

    console.log("addEventEquip req.body:", req.body);

    let status = await auth.authenticateJWT(req, res);
    let userId = status.id;
    let dataRow = [];
    let unixTime = Date.now();



    if (status.status === 200) {

        console.log("authentication successfull!");

        for (let i = 0; i < req.body.length; i++) {
            let obj = new EventEquip(req.body[i].idEvent, req.body[i].idFixture, req.body[i].requiredQty, req.body[i].idWarehouse, req.body[i].whsQty);
            obj.userId = userId;
            obj.unixTime = unixTime;
            const objRow = Object.values(obj);
            dataRow.push(objRow);
        }

        console.log("dataRow:", dataRow);

        try {
            const [newEventEquip] = await EventEquip.addEventEquip(dataRow);
            console.log("result newEventEquip:", newEventEquip);
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

exports.selectFixturesByID = async (req, res) => {
    let addingEquipmentObj = {};
    console.log("addEventEquip req.body:", req.body);

    let status = await auth.authenticateJWT(req, res);

    if (status.status === 200) {

        console.log("authentication successfull!");
        console.log("req.params:",req.params);


        try {
            const [selectedFixtures] = await EventEquip.selectFixturesByID(req.params.idModelName, req.params.idWarehouse, req.params.qty);
            console.log("result selectedFixtures:", selectedFixtures);
            let idFixtureArr = [];
            for (let i = 0; i < selectedFixtures.length; i++) {
                idFixtureArr.push(selectedFixtures[i].idFixture);
            }
            addingEquipmentObj[req.params.idModelName] = idFixtureArr;
            console.log("addingEquipment:", addingEquipmentObj);
            addingEquipmentArr.push(addingEquipmentObj);
            console.log("addingEquipmentArr:", addingEquipmentArr);
        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with writing event equipment to database" });
            return {
                error: true,
                message: 'Error from database'
            }
        }

        res.status(200).json({ msg: 'OK' });

        // } else res.status(400).json(msg);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}