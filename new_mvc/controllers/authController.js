const bcrypt = require('bcrypt');
const auth = require('../models/authModel');
const jwt = require('jsonwebtoken');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

const accessTokenSecret = 'greatSecretForTokenAccessWith#-~';
const refreshTokenSecret = 'someRandomNewStringForRefreshTokenWithout~#-';

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
                user.username = row[0].login,
                    user.password = row[0].crypto,
                    user.role = row[0].role
                console.log("user:", user);
                const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '2m' });
                const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);

                res.status(200).json({
                    accessToken,
                    refreshToken
                });
            } else {
                res.status(200).json({ "result": "Failure" });
            }
        } else res.status(200).json({ "result": "Wrong password or login" });

    } catch (error) {
        if (!error.statusCode) {
            console.log("error:", error);
            error.statusCode = 500;
            res.status(500).json(error);
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

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '2m' });
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