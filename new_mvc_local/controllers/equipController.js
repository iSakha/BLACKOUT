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

    console.log("getFixtureByID");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);

    if (status.status === 200) {

        try {
            [fixture] = await Equipment.getFixturesByModelName(req.params.id);
            console.log("fixture:", fixture);
            fixture.shift();
            return res.status(200).json(fixture);
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

        // let idFixture = [];

        const idFixture = req.body.map(item => item.idFixture);
        idFixture.shift();
        // for (let i = 1; i < req.body.length; i++) {
        //     idFixture.push(req.body[i].idFixture);
        // }

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

exports.getAll = async (req, res) => {

    console.log("getAll");
    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);

    if (status.status === 200) {

        try {
            [allEquip] = await Equipment.getAll();
            console.log("allEquip:", allEquip);
            return res.status(200).json(allEquip);
        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with getting department list from database" });
        }

    } else {
        return res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }


}
