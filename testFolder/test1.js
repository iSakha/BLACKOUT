const Event = require('./test2');

// let obj = {};

// obj.idEvent = '445566';
// obj.title = "title";

let obj = {
    "id": "16553164869",
    "title": "Би-2",
    "time": {
        "start": "2022-06-14T21:00:00.000Z",
        "end": "2022-06-14T21:00:00.000Z"
    },
    "warehouse": {
        "id": 2,
        "name": "Москва"
    }
}

let event = new Event(obj);

console.log(event);