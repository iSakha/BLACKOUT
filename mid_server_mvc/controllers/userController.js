const mysql = require("mysql2");
let config = require('../config/config.js');
const userModel = require('../models/userModel.js');


// check credentials
exports.checkCredentials = (req, res) => {
    const userReqData = new userModel(req.body);
    console.log('userReqData', userReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        userModel.checkCredentials(userReqData, (err, user) => {
            if (err)
                res.send(err);
            console.log('user:', user.length);
            if (user.length === 1) {
                res.json({ status: true, message: 'Login Successfull' });
            }else {
                res.json({ status: false, message: 'Login Unsuccessfull' });
            }

            // res.json({status: true, message: 'Event Created Successfully',data: event.insertId})
        })
    }
}