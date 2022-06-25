const Root = require('../models/rootModel');
const pool = require('../config/database');
const auth = require('../controllers/authController');

exports.greetMessage = (req, res) => {
    try {
        let msg = { msg: "Server is running" };
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
            res.json({ message: 'Successfully connected to MySQL database!' });
        } else {
            console.log('err:', err);
            res.send({ message: 'We\'ve got a problem!' });
        }
    })
}

// LOCATIONS
// =====================================================================
exports.getLocations = async (req, res) => {

    try {
        console.log("getLocations");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status.status);
        if (status.status === 200) {
            const [locations] = await Root.getLocations();
            console.log(locations);
            res.status(200).json(locations);
        } else {
            res.sendStatus(status.status);
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }
}

// CLIENTS
// =====================================================================
exports.getClients = async (req, res) => {
    try {
        console.log("getClients");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status.status);
        if (status.status === 200) {
            const [clients] = await Root.getClients();
            console.log(clients);
            res.status(200).json(clients);
        } else {
            res.sendStatus(status.status);
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }
}

exports.getOneClient = async (req, res) => {
    try {
        console.log("getOneClient_contr");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status.status);
        if (status.status === 200) {
            const [client] = await Root.getOneClient(req.params.id);
            res.status(200).json(client);
        } else {
            res.sendStatus(status.status);
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }
}

exports.deleteClient = async (req, res) => {
    try {
        console.log("deleteClient_contr");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status.status);
        if (status.status === 200) {
            const [client] = await Root.deleteClient(req.params.id);
            res.status(200).json(client);
        } else {
            res.sendStatus(status.status);
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }
}

exports.getUsers = async (req, res) => {

    try {
        console.log("getUsers");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status.status);
        if (status.status === 200) {
            const [users] = await Root.getUsers();
            console.log(users);
            res.status(200).json(users);
        } else {
            res.sendStatus(status.status);
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }

}

exports.getUser = async (req, res) => {

    try {
        console.log("getUser");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status.status);
        if (status.status === 200) {
            const [users] = await Root.getUser(status.id);
            console.log(users);
            res.status(200).json(users);
        } else {
            res.sendStatus(status.status);
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
        console.log("statusCode:", status.status);
        if (status.status === 200) {
            const [stats] = await Root.getStatus();
            console.log(stats);
            res.status(200).json(stats);
        } else {
            res.sendStatus(status.status);
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
        console.log("statusCode:", status.status);
        if (status.status === 200) {
            const [phase] = await Root.getPhases();
            console.log(status);
            res.status(200).json(phase);
        } else {
            res.sendStatus(status.status);
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
        console.log("statusCode:", status.status);
        if (status.status === 200) {
            const [whouses] = await Root.getWarehouses();
            res.status(200).json(whouses);
        } else {
            res.sendStatus(status.status);
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
    // console.log("--------------------------------------------")
    // console.log("New City req.body:", req.body);

    // let city = {};
    // city.title = req.body.city;

    // // await auth.authenticateJWT(req, res);
    // console.log("New City:", city);

}

exports.addStatus = async (req, res) => {

    try {
        console.log("getStatus");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status.status);
        if (status.status === 200) {
            const [stats] = await Root.addStatus();
            console.log(stats);
            res.status(200).json(stats);
        } else {
            res.sendStatus(status.status);
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }

}

exports.addClient = async (req, res) => {

    let clientRow = [req.body.client, req.body.clientDescription, req.body.comments];

    try {
        console.log("addClient");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status.status);
        if (status.status === 200) {
            const [stats] = await Root.addClient(clientRow);
            console.log(stats);
            res.status(200).json(stats);
        } else {
            res.sendStatus(status.status);
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }

}


// UPDATE
// =====================================================================
exports.updateClient = async (req, res) => {

    let clientRow = [req.body.client, req.body.clientDescription, req.body.comments, req.params.id];
    console.log("clientRow:", clientRow);
    try {
        console.log("updateClient");
        let status = await auth.authenticateJWT(req, res);
        console.log("statusCode:", status.status);
        if (status.status === 200) {
            const [stats] = await Root.updateClient(clientRow);
            console.log(stats);
            res.status(200).json(stats);
        } else {
            res.sendStatus(status.status);
        }

        // res.status(200).json({msg: "ok"});

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
    }

}
// DELETE
// =====================================================================

