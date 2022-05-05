let dbConn = require('../config/config.js');

let User = function (event) {

    this.user_name = event.user_name;
    this.user_pass = event.user_pass;

}


// check credentials
User.checkCredentials = (userReqData, result) => {
    console.log('userReqData:', userReqData);
    let dataArray = [userReqData.user_name, userReqData.user_pass];
    console.log('dataArray:', dataArray);
    const sql = "SELECT * FROM `t_users` WHERE `user_name` = ? AND `pass` = ?;";
    dbConn.query(sql, dataArray, (err, res)=>{
        if(err){
            console.log('Error while checking credentials');
            result(null, err);
        }else{
            console.log('Check passed successfully');
            result(null, res);
        }
    })

}

module.exports = User;