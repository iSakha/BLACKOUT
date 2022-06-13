const Root = require('../models/rootModel');
const pool = require('../config/database');
const auth = require('../controllers/authController');

exports.greetMessage = (req, res) => {
    try {
        let msg = {msg : "Server is running"} ;
        res.status(200).json(msg);
    } catch (error) {
        console.log("error:", error);
    }
}

exports.checkDbConnection = (req, res) => {
    pool.getConnection((err, connection) => {
        if (!err) {
          // console.log('connect!')
          connection.release();
          res.json({message:'Successfully connected to MySQL database!'});
        } else {
          console.log('err:', err);
          res.send({message:'We\'ve got a problem!'});
        }
      })
}

// GET
// =====================================================================
exports.getLocations = async (req, res) => {

    try {
        console.log("getLocations");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status);
        if (status === 200) {
            const [locations] = await Root.getLocations();
            console.log(locations);
            res.status(200).json(locations);
        } else {
            res.sendStatus(status);
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }
}

exports.getClients = async (req, res) => {
    try {
        console.log("getClients");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status);
        if (status === 200) {
            const [clients] = await Root.getClients();
            console.log(clients);
            res.status(200).json(clients);
        } else {
            res.sendStatus(status);
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }
}

exports.getManagers = async (req, res) => {

    try {
        console.log("getManagers");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status);
        if (status === 200) {
            const [users] = await Root.getUsers();
            console.log(users);
            res.status(200).json(users);
        } else {
            res.sendStatus(status);
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }

}

exports.getStatus = async (req, res) => {

    try {
        console.log("getStatus");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status);
        if (status === 200) {
            const [status] = await Root.getStatus();
            console.log(status);
            res.status(200).json(status);
        } else {
            res.sendStatus(status);
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }

}

exports.getPhases = async (req, res) => {

    try {
        console.log("getPhases");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status);
        if (status === 200) {
            const [phase] = await Root.getPhases();
            console.log(status);
            res.status(200).json(phase);
        } else {
            res.sendStatus(status);
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }
}

exports.getWarehouses = async (req, res) => {
    try {
        console.log("getWarehouses");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status);
        if (status === 200) {
            const [whouses] = await Root.getWarehouses();
            res.status(200).json(whouses);
        } else {
            res.sendStatus(status);
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }

}

// CREATE
// =====================================================================
exports.newCity = async (req, res) => {
    console.log("--------------------------------------------")
    console.log("New City req.body:", req.body);

    let city = {};
    city.title = req.body.city;

    // await auth.authenticateJWT(req, res);
    console.log("New City:", city);

}
// UPDATE
// =====================================================================

// DELETE
// =====================================================================

