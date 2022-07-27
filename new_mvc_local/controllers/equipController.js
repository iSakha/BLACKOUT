const jwt = require('jsonwebtoken');
const auth = require('../controllers/authController');
const Equipment = require('../models/equipModel');


exports.getDepartments = async (req, res) => {

    console.log("getDepartments");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);

    if (status.status === 200) {

        try {
            [allDeps] = await Equipment.getDepartments();
            console.log("allDeps:", allDeps);
            return res.status(200).json(allDeps);
        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with getting department list from database" });
        }

    } else {
        return res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }


}

exports.getCategories = async (req, res) => {

    console.log("getCategories");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);

    if (status.status === 200) {

        try {
            [allCats] = await Equipment.getCategories();
            console.log("allCats:", allCats);
            return res.status(200).json(allCats);
        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with getting category list from database" });
        }

    } else {
        return res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }

}

exports.getCategoriesByDep = async (req, res) => {

    console.log("getCategoriesByDep");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);

    if (status.status === 200) {

        try {
            [cats] = await Equipment.getCategoriesByDep(req.params.id);
            console.log("cats:", cats);
            return res.status(200).json(cats);
        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with getting category by dep from database" });
        }

    } else {
        return res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}

exports.getEquipmentByDep = async (req, res) => {

    console.log("getEquipmentByDep");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);

    if (status.status === 200) {

        try {
            [equip] = await Equipment.getEquipmentByDep(req.params.id);
            console.log("equip:", equip);
            return res.status(200).json(equip);
        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with getting equipment by dep from database" });
        }

    } else {
        return res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }


}

exports.getEquipmentByDepCat = async (req, res) => {

    console.log("getEquipmentByDepCat");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);


    if (status.status === 200) {

        try {
            [equip] = await Equipment.getEquipmentByDepCat(req.params.idDep, req.params.idCat);
            console.log("equip:", equip);
            return res.status(200).json(equip);
        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with getting equipment by dep and cat from database" });
        }

    } else {
        return res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}

exports.getFixtureByDepCatName = async (req, res) => {

    console.log("getFixtureByDepCatName");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);

    if (status.status === 200) {

        try {
            [fixture] = await Equipment.getFixtureByDepCatName(req.params.idDep, req.params.idCat, req.params.idName);
            console.log("fixture:", fixture);
            return res.status(200).json(fixture);
        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with getting fixtures by dep, cat and name from database" });
        }

    } else {
        return res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}

exports.getFixturesByModelName = async (req, res) => {

    let fixtureArr = [];

    console.log("getFixtureByID");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);

    if (status.status === 200) {

        try {
            [fixture] = await Equipment.getFixturesByModelName(req.params.id);

            console.log("fixture:", fixture);

            for (let i = 0; i < fixture.length; i++) {

                let fixtureObj = {};

                fixtureObj.id = fixture[i].idFixture;
                fixtureObj.whCode = fixture[i].whCode;
                fixtureObj.sNumber = fixture[i].sNumber;
                fixtureObj.uidCloudio = fixture[i].uidCloudio;

                fixtureObj.model = {};
                fixtureObj.model.id = fixtureObj.id.slice(12, 16);
                fixtureObj.model.name = fixture[i].modelName;
                fixtureObj.model.manufactor = fixture[i].manufactor;

                fixtureObj.category = {};
                fixtureObj.category.idDep = fixtureObj.id.slice(0, 3);
                fixtureObj.category.idCat = fixtureObj.id.slice(4, 7);
                fixtureObj.category.idModel = fixtureObj.id.slice(8, 11);

                fixtureObj.warehouse = {};
                fixtureObj.warehouse.id = fixture[i].idWarehouse;
                fixtureObj.warehouse.name = fixture[i].whName;

                fixtureObj.workStatus = {};
                fixtureObj.workStatus.id = fixture[i].idFixtureState;
                fixtureObj.workStatus.name = fixture[i].workStatus;

                fixtureObj.whereStatus = {};
                fixtureObj.whereStatus.id = 2;
                fixtureObj.whereStatus.name = "На складе";

                fixtureArr.push(fixtureObj);

            }

            return res.status(200).json(fixtureArr);
        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with getting fixtures by id from database" });
        }

    } else {
        return res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }
}

// Get qty fixtures by id
// =====================================================================
exports.getQtyById = async (req, res) => {

    let fixture;
    console.log("getQtyById");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);
    let id = req.params.id + ".000"

    if (status.status === 200) {

        try {
            [fixture] = await Equipment.getQtyById(id);
            console.log("getQtyById:", fixture);
            return res.status(200).json(fixture);
        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with getting qty fixtures by id from database" });
        }

    } else {
        return res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }


}

// Set fixture status
// =====================================================================

exports.workStatusChanged = async (req, res) => {

    let fixtureRow = [];

    console.log("changeStatusById");
    console.log("req.body:", req.body);

    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);

    if (status.status === 200) {

        fixtureRow.push(req.body.id);
        fixtureRow.push(req.body.note);
        fixtureRow.push(req.body.workStatus.id);
        fixtureRow.push(Date.now());

        console.log("fixtureRow:", fixtureRow);

        try {
            [fixture] = await Equipment.writeToHistory(fixtureRow);
            console.log("writeToHistory:", fixture);

        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with 'writeToHistory'" });
        }

        try {

            [fixture] = await Equipment.changeStatusById(req.body.workStatus.id, req.body.id);
            console.log("changeStatusById:", fixture);

        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with 'changeStatusById'" });
        }

        return res.status(200).json({ msg: "Запись прибора в базу прошла успешно." });

    } else {
        return res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }


}

exports.changeStatusById = async (req, res) => {

    let fixtureRow = [];

    console.log("changeStatusById");
    console.log("req.body:", req.body);

    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);

    if (status.status === 200) {

        fixtureRow.push(req.body.idFixture);
        fixtureRow.push(req.body.idAction);
        fixtureRow.push(req.body.comments);
        fixtureRow.push(req.body.spareParts);
        fixtureRow.push(req.body.date);
        fixtureRow.push(req.params.status);
        fixtureRow.push(Date.now());
        fixtureRow.push(req.body.idEvent);

        console.log("fixtureRow:", fixtureRow);

        try {
            [fixture] = await Equipment.writeToHistory(fixtureRow);
            console.log("writeToHistory:", fixture);

        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with 'writeToHistory'" });
        }

        try {

            [fixture] = await Equipment.changeStatusById(req.params.status, req.body.idFixture);
            console.log("changeStatusById:", fixture);

        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with 'changeStatusById'" });
        }

        return res.status(200).json({ msg: "Запись прибора в базу прошла успешно." });

    } else {
        return res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }


}


exports.getFixtureHistory = async (req, res) => {
    let fixture;
    console.log("getFixtureHistory");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);


    if (status.status === 200) {

        try {
            [fixture] = await Equipment.getFixtureHistory();
            console.log("fixture:", fixture);
            return res.status(200).json(fixture);
        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with getting fixtures history from database" });
        }

    } else {
        return res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }


}

exports.getFixtureHistoryByID = async (req, res) => {
    let fixture;
    console.log("getFixtureHistory");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);


    if (status.status === 200) {

        try {
            [fixture] = await Equipment.getFixtureHistoryByID(req.params.id);
            console.log("fixture:", fixture);
            return res.status(200).json(fixture);
        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with getting fixtures history from database" });
        }

    } else {
        return res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }


}


exports.fixturesMovement = async (req, res) => {

    console.log("fixturesMovement");
    console.log("req.body:", req.body);

    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);

    if (status.status === 200) {

        const idFixture = req.body.map(item => item.idFixture);
        idFixture.shift();


        console.log("idFixture:", idFixture);

        try {
            [fixture] = await Equipment.fixturesMovement(req.body[0].idWarehouse, idFixture);
            console.log("fixturesMovement:", fixture);
            return res.status(200).json({ msg: "Запись в базу перемещения приборов прошло успешно." });
        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with 'fixturesMovement'" });
        }



    } else {
        return res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }

}

exports.getAllModels = async (req, res) => {

    let qty = [];

    console.log("getAllModels");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);
    let equipModels = [];
    if (status.status === 200) {

        try {
            [qty] = await Equipment.getQty();
            console.log("qty:", qty)

        } catch (error) {

        }


        try {
            [allModels] = await Equipment.getAllModels();
            // console.log("allModels:", allModels);

            for (let i = 0; i < allModels.length; i++) {
                let e = new Equipment();
                console.log(e);
                e.id = allModels[i].id;
                e.name = allModels[i].name;
                e.manufactor = allModels[i].manufactor;
                e.img = allModels[i].img;
                e.category.idDep = allModels[i].idDep;
                e.category.idCat = allModels[i].idCat;

                e.deviceData.weight = allModels[i].weight;
                e.deviceData.power = allModels[i].power;
                e.deviceData.transportWeight = allModels[i].transportWeight;
                e.deviceData.volume = allModels[i].volume;
                e.case.inCase = allModels[i].inCase;
                e.case.length = allModels[i].caseLength;
                e.case.width = allModels[i].caseWidth;
                e.case.height = allModels[i].caseHeight;

                e.quantity = {};
                e.quantity.all = {};
                e.quantity.all.qty = qty[i].qty;
                e.quantity.all.qtyWork = qty[i].qtyWork;
                e.quantity.all.qtyBroken = qty[i].qtyBroken;
                e.quantity.all.qtyCondWork = qty[i].qty - qty[i].qtyWork - qty[i].qtyBroken;

                e.quantity.onWarehouse = [{}];

                e.quantity.onWarehouse[0] = {};
                e.quantity.onWarehouse[0].id = 2;
                e.quantity.onWarehouse[0].name = "Минск";
                e.quantity.onWarehouse[0].qty = qty[i].qtyMinsk;
                e.quantity.onWarehouse[0].qtyWork = qty[i].qtyMinsk_work;
                e.quantity.onWarehouse[0].qtyBroken = qty[i].qtyMinsk_broken;
                e.quantity.onWarehouse[0].qtyCondWork = qty[i].qtyMinsk_cond_w;

                e.quantity.onWarehouse[1] = {};
                e.quantity.onWarehouse[1].id = 3;
                e.quantity.onWarehouse[1].name = "Москва";
                e.quantity.onWarehouse[1].qty = qty[i].qtyMoscow;
                e.quantity.onWarehouse[1].qtyWork = qty[i].qtyMoscow_work;
                e.quantity.onWarehouse[1].qtyBroken = qty[i].qtyMoscow_broken;
                e.quantity.onWarehouse[1].qtyCondWork = qty[i].qtyMoscow_cond_w;

                e.quantity.onWarehouse[2] = {};
                e.quantity.onWarehouse[2].id = 4;
                e.quantity.onWarehouse[2].name = "Казань";
                e.quantity.onWarehouse[2].qty = qty[i].qtyKazan;
                e.quantity.onWarehouse[2].qtyWork = qty[i].qtyKazan_work;
                e.quantity.onWarehouse[2].qtyBroken = qty[i].qtyKazan_broken;
                e.quantity.onWarehouse[2].qtyCondWork = qty[i].qtyKazan_cond_w;

                e.quantity.onWarehouse[3] = {};
                e.quantity.onWarehouse[3].id = 5;
                e.quantity.onWarehouse[3].name = "Питер";
                e.quantity.onWarehouse[3].qty = qty[i].qtyPiter;
                e.quantity.onWarehouse[3].qtyWork = qty[i].qtyPiter_work;
                e.quantity.onWarehouse[3].qtyBroken = qty[i].qtyPiter_broken;
                e.quantity.onWarehouse[3].qtyCondWork = qty[i].qtyPiter_cond_w;

                equipModels.push(e);
            }

            // console.log(equip);

            return res.status(200).json(equipModels);
        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with getting department list from database" });
        }

    } else {
        return res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }


}

exports.getOneModel = async (req, res) => {
    let qty;
    console.log("getOnemodel");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);
    // let equipModels = [];
    if (status.status === 200) {

        try {
            let id = req.params.id + ".0000";
            [qty] = await Equipment.getQtyById(id);
            console.log("qty:", qty)

        } catch (error) {

        }

        try {
            [model] = await Equipment.getOneModel(req.params.id);
            // console.log("model:", model);

            let e = new Equipment();
            console.log(e);
            e.id = model[0].id;
            e.name = model[0].name;
            e.manufactor = model[0].manufactor;
            e.img = model[0].img;
            e.category.idDep = model[0].idDep;
            e.category.idCat = model[0].idCat;

            e.deviceData.weight = model[0].weight;
            e.deviceData.power = model[0].power;
            e.deviceData.transportWeight = model[0].transportWeight;
            e.deviceData.volume = model[0].volume;
            e.case.inCase = model[0].inCase;
            e.case.length = model[0].caseLength;
            e.case.width = model[0].caseWidth;
            e.case.height = model[0].caseHeight;



            e.quantity = {};
            e.quantity.all = {};
            e.quantity.all.qty = qty[0].qty;
            e.quantity.all.qtyWork = qty[0].qtyWork;
            e.quantity.all.qtyBroken = qty[0].qtyBroken;
            e.quantity.all.qtyCondWork = qty[0].qty - qty[0].qtyWork - qty[0].qtyBroken;

            e.quantity.onWarehouse = [{}];

            e.quantity.onWarehouse[0] = {};
            e.quantity.onWarehouse[0].id = 2;
            e.quantity.onWarehouse[0].name = "Минск";
            e.quantity.onWarehouse[0].qty = qty[0].qtyMinsk;
            e.quantity.onWarehouse[0].qtyWork = qty[0].qtyMinsk_work;
            e.quantity.onWarehouse[0].qtyBroken = qty[0].qtyMinsk_broken;
            e.quantity.onWarehouse[0].qtyCondWork = qty[0].qtyMinsk_cond_w;

            e.quantity.onWarehouse[1] = {};
            e.quantity.onWarehouse[1].id = 3;
            e.quantity.onWarehouse[1].name = "Москва";
            e.quantity.onWarehouse[1].qty = qty[0].qtyMoscow;
            e.quantity.onWarehouse[1].qtyWork = qty[0].qtyMoscow_work;
            e.quantity.onWarehouse[1].qtyBroken = qty[0].qtyMoscow_broken;
            e.quantity.onWarehouse[1].qtyCondWork = qty[0].qtyMoscow_cond_w;

            e.quantity.onWarehouse[2] = {};
            e.quantity.onWarehouse[2].id = 4;
            e.quantity.onWarehouse[2].name = "Казань";
            e.quantity.onWarehouse[2].qty = qty[0].qtyKazan;
            e.quantity.onWarehouse[2].qtyWork = qty[0].qtyKazan_work;
            e.quantity.onWarehouse[2].qtyBroken = qty[0].qtyKazan_broken;
            e.quantity.onWarehouse[2].qtyCondWork = qty[0].qtyKazan_cond_w;

            e.quantity.onWarehouse[3] = {};
            e.quantity.onWarehouse[3].id = 5;
            e.quantity.onWarehouse[3].name = "Питер";
            e.quantity.onWarehouse[3].qty = qty[0].qtyPiter;
            e.quantity.onWarehouse[3].qtyWork = qty[0].qtyPiter_work;
            e.quantity.onWarehouse[3].qtyBroken = qty[0].qtyPiter_broken;
            e.quantity.onWarehouse[3].qtyCondWork = qty[0].qtyPiter_cond_w;


            // console.log(equip);

            return res.status(200).json(e);
        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with getting one model from database" });
        }

    } else {
        return res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }


}
