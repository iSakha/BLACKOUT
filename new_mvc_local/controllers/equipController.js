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

        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting department list from database" });
        }

        res.status(200).json(allDeps);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
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

        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting category list from database" });
        }

        res.status(200).json(allCats);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
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

        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting category by dep from database" });
        }

        res.status(200).json(cats);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
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

        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting equipment by dep from database" });
        }

        res.status(200).json(equip);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
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

        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting equipment by dep and cat from database" });
        }

        res.status(200).json(equip);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
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

        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting fixtures by dep, cat and name from database" });
        }

        res.status(200).json(fixture);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
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

        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting fixtures by id from database" });
        }

        res.status(200).json(fixture);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
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

        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting qty fixtures by id from database" });
        }

        res.status(200).json(fixture);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
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

        res.status(200).json({ msg: "Запись прибора в базу прошла успешно." });

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
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

        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting fixtures history from database" });
        }

        res.status(200).json(fixture);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
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

        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with getting fixtures history from database" });
        }

        res.status(200).json(fixture);

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }


}


exports.fixturesMovement = async (req, res) => {

    let fixtureRow = [];

    console.log("fixturesMovement");
    console.log("req.body:", req.body);

    let status = await auth.authenticateJWT(req, res);
    console.log("statusCode:", status);


    if (status.status === 200) {

        // fixtureRow.push(req.body.idFixture);
        // fixtureRow.push(req.body.idAction);
        // fixtureRow.push(req.body.comments);
        // fixtureRow.push(req.body.spareParts);
        // fixtureRow.push(req.body.date);
        // fixtureRow.push(req.params.status);
        // fixtureRow.push(Date.now());
        // fixtureRow.push(req.body.idEvent);

        // console.log("fixtureRow:", fixtureRow);

        let idFixture = [];

        for (let i = 1; i < req.body.length; i++) {
            idFixture.push(req.body[i].idFixture);
        }

        console.log("idFixture:",idFixture);

        try {

            [fixture] = await Equipment.fixturesMovement(req.body[0].idWarehouse, idFixture);
            console.log("fixturesMovement:", fixture);

        } catch (error) {
            console.log("error:", error);
            return res.status(500).json({ msg: "We have problems with 'fixturesMovement'" });
        }

        res.status(200).json({ msg: "Запись в базу перемещения приборов прошло успешно." });

    } else {
        res.status(status.status).json({ msg: "We have problems with JWT authentication" });
    }


}
