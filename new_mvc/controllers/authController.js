const bcrypt = require('bcrypt');
const auth = require('../models/authModel');
const jwt = require('jsonwebtoken');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

const accessTokenSecret = 'greatSecretForTokenAccessWith#-~';
const refreshTokenSecret = 'someRandomNewStringForRefreshTokenWithout~#-';

exports.validateUser = async (req, res) => {

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
                console.log(user);
                const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });
                const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);

                res.status(200).json({
                    accessToken,
                    refreshToken
                });
            } else {
                res.status(200).json({ "result": "Failure" });
            }
        } else res.status(200).json({ "result": "Wrong password or login" });




        // res.status(200).json(newEvent);



    } catch (error) {
        if (!error.statusCode) {
            console.log("error:", error);
            error.statusCode = 500;
            res.status(500).json(error);
        }
    }



}