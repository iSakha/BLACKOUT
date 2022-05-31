// index.js

 

// подключаем bcrypt

var bcrypt = require('bcrypt');

 

// пароль пользователя

var passwordFromUser = "test_guest";

 

// создаем соль

var salt = bcrypt.genSaltSync(10);

 

// шифруем пароль

var passwordToSave = bcrypt.hashSync(passwordFromUser, salt)

 

// выводим результат

console.log("salt:",salt);

console.log("passwordFromUser:",passwordFromUser);

console.log("passwordToSave:", passwordToSave);

function validateUserPass() {
    connection.query("SELECT * FROM users WHERE username = ?",

    [usernameEnteredByUser],

    function(err, rows) {

        if (err) {

            return done(err);

        }

        if (bcrypt.hashSync(passwordEnteredByUser, salt) === rows[0].password) {

          // да, это работает

        }

});
}