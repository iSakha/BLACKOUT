const jwt = require('jsonwebtoken');
const auth = require('../controllers/authController');
const Equipment= require('../models/equipModel');


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