const { send } = require("express/lib/response")

const arr = [
    { place: "here", name: "x", other: "other stuff1" },
    { place: "there", name: "x", other: "other stuff2" },
    { place: "here", name: "y", other: "other stuff4" },
    { place: "here", name: "z", other: "other stuff5" }
]

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

const arr1 = getUniqueListBy(arr, 'place')

console.log("Unique by place")
console.log(JSON.stringify(arr1))

console.log("\nUnique by name")
const arr2 = getUniqueListBy(arr, 'name')

console.log(JSON.stringify(arr2))

let eventObj = [
    {
        "id": 57,
        "warehouseId": 3,
        "warehouse": "Москва",
        "title": "back ticks 2",
        "clientId": 1,
        "client": "",
        "start": "2022-05-13T21:00:00.000Z",
        "end": "2022-05-12T21:00:00.000Z",
        "statusId": 4,
        "status": "На рассмотрении",
        "event_cityId": 2,
        "event_city": "Минск",
        "event_placeId": 2,
        "event_place": "Дворец Спорта",
        "id_phase": 2,
        "phase_title": "Погрузка",
        "phase_start": "2022-05-13T08:00:00.000Z",
        "phase_end": "2022-05-13T10:00:00.000Z",
        "notes": "777",
        "manager_1Id": 2,
        "manager_1": "John, Doe",
        "manager_2Id": 4,
        "manager_2": "Иванов, ИванИванович",
        "current_user": "john_doe"
    },
    {
        "id": 57,
        "warehouseId": 3,
        "warehouse": "Москва",
        "title": "back ticks 2",
        "clientId": 1,
        "client": "",
        "start": "2022-05-13T21:00:00.000Z",
        "end": "2022-05-12T21:00:00.000Z",
        "statusId": 4,
        "status": "На рассмотрении",
        "event_cityId": 2,
        "event_city": "Минск",
        "event_placeId": 2,
        "event_place": "Дворец Спорта",
        "id_phase": 3,
        "phase_title": "Монтаж",
        "phase_start": "2022-05-13T12:00:00.000Z",
        "phase_end": "2022-05-14T00:00:00.000Z",
        "notes": "777",
        "manager_1Id": 2,
        "manager_1": "John, Doe",
        "manager_2Id": 4,
        "manager_2": "Иванов, ИванИванович",
        "current_user": "john_doe"
    },
    {
        "id": 57,
        "warehouseId": 3,
        "warehouse": "Москва",
        "title": "back ticks 2",
        "clientId": 1,
        "client": "",
        "start": "2022-05-13T21:00:00.000Z",
        "end": "2022-05-12T21:00:00.000Z",
        "statusId": 4,
        "status": "На рассмотрении",
        "event_cityId": 2,
        "event_city": "Минск",
        "event_placeId": 2,
        "event_place": "Дворец Спорта",
        "id_phase": 4,
        "phase_title": "Репетиция",
        "phase_start": "2022-05-14T03:00:00.000Z",
        "phase_end": "2022-05-14T14:00:00.000Z",
        "notes": "777",
        "manager_1Id": 2,
        "manager_1": "John, Doe",
        "manager_2Id": 4,
        "manager_2": "Иванов, ИванИванович",
        "current_user": "john_doe"
    },
    {
        "id": 57,
        "warehouseId": 3,
        "warehouse": "Москва",
        "title": "back ticks 2",
        "clientId": 1,
        "client": "",
        "start": "2022-05-13T21:00:00.000Z",
        "end": "2022-05-12T21:00:00.000Z",
        "statusId": 4,
        "status": "На рассмотрении",
        "event_cityId": 2,
        "event_city": "Минск",
        "event_placeId": 2,
        "event_place": "Дворец Спорта",
        "id_phase": 5,
        "phase_title": "Работа",
        "phase_start": "2022-05-15T04:00:00.000Z",
        "phase_end": "2022-05-15T15:00:00.000Z",
        "notes": "777",
        "manager_1Id": 2,
        "manager_1": "John, Doe",
        "manager_2Id": 4,
        "manager_2": "Иванов, ИванИванович",
        "current_user": "john_doe"
    },
    {
        "id": 57,
        "warehouseId": 3,
        "warehouse": "Москва",
        "title": "back ticks 2",
        "clientId": 1,
        "client": "",
        "start": "2022-05-13T21:00:00.000Z",
        "end": "2022-05-12T21:00:00.000Z",
        "statusId": 4,
        "status": "На рассмотрении",
        "event_cityId": 2,
        "event_city": "Минск",
        "event_placeId": 2,
        "event_place": "Дворец Спорта",
        "id_phase": 5,
        "phase_title": "Работа",
        "phase_start": "2022-05-16T04:00:00.000Z",
        "phase_end": "2022-05-16T15:00:00.000Z",
        "notes": "777",
        "manager_1Id": 2,
        "manager_1": "John, Doe",
        "manager_2Id": 4,
        "manager_2": "Иванов, ИванИванович",
        "current_user": "john_doe"
    },
    {
        "id": 57,
        "warehouseId": 3,
        "warehouse": "Москва",
        "title": "back ticks 2",
        "clientId": 1,
        "client": "",
        "start": "2022-05-13T21:00:00.000Z",
        "end": "2022-05-12T21:00:00.000Z",
        "statusId": 4,
        "status": "На рассмотрении",
        "event_cityId": 2,
        "event_city": "Минск",
        "event_placeId": 2,
        "event_place": "Дворец Спорта",
        "id_phase": 5,
        "phase_title": "Работа",
        "phase_start": "2022-05-17T04:00:00.000Z",
        "phase_end": "2022-05-17T15:00:00.000Z",
        "notes": "777",
        "manager_1Id": 2,
        "manager_1": "John, Doe",
        "manager_2Id": 4,
        "manager_2": "Иванов, ИванИванович",
        "current_user": "john_doe"
    },
    {
        "id": 57,
        "warehouseId": 3,
        "warehouse": "Москва",
        "title": "back ticks 2",
        "clientId": 1,
        "client": "",
        "start": "2022-05-13T21:00:00.000Z",
        "end": "2022-05-12T21:00:00.000Z",
        "statusId": 4,
        "status": "На рассмотрении",
        "event_cityId": 2,
        "event_city": "Минск",
        "event_placeId": 2,
        "event_place": "Дворец Спорта",
        "id_phase": 6,
        "phase_title": "Демонтаж",
        "phase_start": "2022-05-18T03:00:00.000Z",
        "phase_end": "2022-05-19T03:00:00.000Z",
        "notes": "777",
        "manager_1Id": 2,
        "manager_1": "John, Doe",
        "manager_2Id": 4,
        "manager_2": "Иванов, ИванИванович",
        "current_user": "john_doe"
    },
    {
        "id": 57,
        "warehouseId": 3,
        "warehouse": "Москва",
        "title": "back ticks 2",
        "clientId": 1,
        "client": "",
        "start": "2022-05-13T21:00:00.000Z",
        "end": "2022-05-12T21:00:00.000Z",
        "statusId": 4,
        "status": "На рассмотрении",
        "event_cityId": 2,
        "event_city": "Минск",
        "event_placeId": 2,
        "event_place": "Дворец Спорта",
        "id_phase": 7,
        "phase_title": "Разгрузка",
        "phase_start": "2022-05-19T05:00:00.000Z",
        "phase_end": "2022-05-19T08:00:00.000Z",
        "notes": "777",
        "manager_1Id": 2,
        "manager_1": "John, Doe",
        "manager_2Id": 4,
        "manager_2": "Иванов, ИванИванович",
        "current_user": "john_doe"
    },
    {
        "id": 61,
        "warehouseId": 2,
        "warehouse": "Минск",
        "title": "trtrtrtrt",
        "clientId": 4,
        "client": "Пожарное депо №3",
        "start": "2022-05-09T21:00:00.000Z",
        "end": "2022-05-04T21:00:00.000Z",
        "statusId": 1,
        "status": "",
        "event_cityId": 1,
        "event_city": "",
        "event_placeId": 1,
        "event_place": "",
        "id_phase": 2,
        "phase_title": "Погрузка",
        "phase_start": "2022-04-18T01:00:00.000Z",
        "phase_end": "2022-04-18T04:00:00.000Z",
        "notes": "Репетиция",
        "manager_1Id": 2,
        "manager_1": "John, Doe",
        "manager_2Id": 2,
        "manager_2": "John, Doe",
        "current_user": "john_doe"
    },
    {
        "id": 61,
        "warehouseId": 2,
        "warehouse": "Минск",
        "title": "trtrtrtrt",
        "clientId": 4,
        "client": "Пожарное депо №3",
        "start": "2022-05-09T21:00:00.000Z",
        "end": "2022-05-04T21:00:00.000Z",
        "statusId": 1,
        "status": "",
        "event_cityId": 1,
        "event_city": "",
        "event_placeId": 1,
        "event_place": "",
        "id_phase": 3,
        "phase_title": "Монтаж",
        "phase_start": "2022-04-18T08:00:00.000Z",
        "phase_end": "2022-04-18T16:00:00.000Z",
        "notes": "Репетиция",
        "manager_1Id": 2,
        "manager_1": "John, Doe",
        "manager_2Id": 2,
        "manager_2": "John, Doe",
        "current_user": "john_doe"
    },
    {
        "id": 61,
        "warehouseId": 2,
        "warehouse": "Минск",
        "title": "trtrtrtrt",
        "clientId": 4,
        "client": "Пожарное депо №3",
        "start": "2022-05-09T21:00:00.000Z",
        "end": "2022-05-04T21:00:00.000Z",
        "statusId": 1,
        "status": "",
        "event_cityId": 1,
        "event_city": "",
        "event_placeId": 1,
        "event_place": "",
        "id_phase": 5,
        "phase_title": "Работа",
        "phase_start": "2022-04-19T03:00:00.000Z",
        "phase_end": "2022-04-19T16:00:00.000Z",
        "notes": "Репетиция",
        "manager_1Id": 2,
        "manager_1": "John, Doe",
        "manager_2Id": 2,
        "manager_2": "John, Doe",
        "current_user": "john_doe"
    },
    {
        "id": 61,
        "warehouseId": 2,
        "warehouse": "Минск",
        "title": "trtrtrtrt",
        "clientId": 4,
        "client": "Пожарное депо №3",
        "start": "2022-05-09T21:00:00.000Z",
        "end": "2022-05-04T21:00:00.000Z",
        "statusId": 1,
        "status": "",
        "event_cityId": 1,
        "event_city": "",
        "event_placeId": 1,
        "event_place": "",
        "id_phase": 6,
        "phase_title": "Демонтаж",
        "phase_start": "2022-04-19T16:00:00.000Z",
        "phase_end": "2022-04-20T00:00:00.000Z",
        "notes": "Репетиция",
        "manager_1Id": 2,
        "manager_1": "John, Doe",
        "manager_2Id": 2,
        "manager_2": "John, Doe",
        "current_user": "john_doe"
    },
    {
        "id": 61,
        "warehouseId": 2,
        "warehouse": "Минск",
        "title": "trtrtrtrt",
        "clientId": 4,
        "client": "Пожарное депо №3",
        "start": "2022-05-09T21:00:00.000Z",
        "end": "2022-05-04T21:00:00.000Z",
        "statusId": 1,
        "status": "",
        "event_cityId": 1,
        "event_city": "",
        "event_placeId": 1,
        "event_place": "",
        "id_phase": 7,
        "phase_title": "Разгрузка",
        "phase_start": "2022-04-20T05:00:00.000Z",
        "phase_end": "2022-04-20T09:00:00.000Z",
        "notes": "Репетиция",
        "manager_1Id": 2,
        "manager_1": "John, Doe",
        "manager_2Id": 2,
        "manager_2": "John, Doe",
        "current_user": "john_doe"
    }
]

// get unique event_id
// =======================================
const uniques = eventObj.map(
    (obj) => {
        return obj.id
    }
).filter(
    (item, index, arr) => {
        return arr.indexOf(item) == index
    }
);

console.log("uniques:", uniques);       //  uniques: [ 57, 61 ]

let phase = [];
let sendingObject = [];
for (let i = 0; i < uniques.length; i++) {

    // filter by id
    // =======================================
    let eventObjId = eventObj.filter((p) => {
        return p.id == uniques[i];
    })

    console.log("eventObjId", eventObjId);
    console.log("length", eventObjId.length);

    for (let j = 0; j < eventObjId.length; j++) {

        let ph = {};
        ph.id = j + 1;
        ph.id_phase = eventObj[j].id_phase;
        ph.id_event = uniques[i]
        ph.phase_title = eventObj[j].phase_title;
        ph.phase_start = eventObj[j].phase_start;
        ph.phase_end = eventObj[j].phase_end;

        phase.push(ph);

    }
    let so = {};
    so.id = eventObj[i].id;
    so.warehouseId = eventObj[i].warehouseId;
    so.warehouse = eventObj[i].warehouse;
    so.title = eventObj[i].title;
    so.clientId = eventObj[i].clientId;
    so.client= eventObj[i].client;
    so.start = eventObj[i].start;
    so.end = eventObj[i].end;
    so.phase = phase;


    sendingObject.push(so);


    console.log("phase", phase)

}

console.log("sendingObject", sendingObject)