const utils = require('./utils/utils');

let createdAt = utils.currentDateTime();
console.log("createdAt", createdAt);
createdAt = createdAt + 2;
console.log("createdAt + 2", createdAt);

var currentTime = Date.now();
console.log("currentTime", currentTime);


currentTime = currentTime + 2000;
console.log("currentTime + 2", currentTime);


var currentTime = new Date();
console.log("currentTime", currentTime);



