const bcrypt = require('bcrypt');
const auth = require('../models/authModel');
const jwt = require('jsonwebtoken');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

const accessTokenSecret = 'greatSecretForTokenAccessWith#-~';
const refreshTokenSecret = 'someRandomNewStringForRefreshTokenWithout~#-';


exports.authenticateJWT = (req, res) => {
    const authHeader = req.headers.authorization;
    let status;
    let id;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                status = 403;
            } else {
                status = 200;
                req.user = user;
                console.log("auth user:", user);
                id = user.id;
            }
        });
    } else {
        status = 401;
    }
    return { status: status, id: id };
};

exports.validateUser = async (req, res) => {
    console.log("validateUser");

    try {
        console.log("login:", req.body.login);
        console.log("pass:", req.body.pass);

        const [row] = await auth.validateUser(req.body.login);

        console.log("row:", row);

        if (row.length > 0) {
            let passwordEnteredByUser = req.body.pass;
            let salt = row[0].salt;

            console.log("salt:", salt);


            if (bcrypt.hashSync(passwordEnteredByUser, salt) === row[0].crypto) {
                
                let user = {};

                user.id = row[0].id;
                user.login = row[0].login;
                let name = {};
                name.firstName = row[0].firstName;
                name.lastName = row[0].lastName;
                name.patronymic = row[0].patrName;
                name.fullName = row[0].fullName;
                user.name = name;
                name.avatar = row[0].avatar;
                let role = {};
                role.id = row[0].idRole;
                role.name = row[0].role;
                user.role = role;
                let contacts = {};
                contacts.phone1 = row[0].phone1;
                contacts.phone2 = row[0].phone2;
                contacts.email = row[0].email;
                user.contacts = contacts;
                let warehouse = {};
                warehouse.id = row[0].idWarehouse;
                warehouse.name = row[0].warehouse;
                user.warehouse = warehouse;
                let department = {};
                department.id = row[0].idDepartment;
                department.name = row[0].department;
                user.department = department;

                console.log("row[0]:", row[0]);
                console.log("user:", user);
                const accessToken = jwt.sign({ username: user.username, role: user.role, id: user.id }, accessTokenSecret, { expiresIn: '120m' });
                const refreshToken = jwt.sign({ username: user.username, role: user.role, id: user.id }, refreshTokenSecret);


                res.status(200).json({
                    user,
                    accessToken,
                    refreshToken
                });
            } else {
                res.status(401).json({ "result": "Wrong password or login" });
            }
        } else res.status(401).json({ "result": "Wrong password or login" });

    } catch (error) {
        if (!error.statusCode) {
            console.log("error:", error);
            error.statusCode = 500;
            res.status(500).json({"error": error});
        }
    }
}

exports.updateToken = async (req, res) => {
    console.log("updateToken");
    console.log("req.body:", req.body);
    const { token } = req.body;

    if (!token) {
        console.log("token 401:", token);
        return res.sendStatus(401);
    }
    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            console.log("token 403:", token);
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '120m' });
        const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);

        console.log("updated accessToken:", accessToken);
        console.log("updated refreshToken:", refreshToken);

        // res.status(200).json({
        //     "message": "test"
        // });
        res.status(200).json({
            accessToken,
            refreshToken
        });
    });
}