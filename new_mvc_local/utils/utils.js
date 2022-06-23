const Event = require('../models/eventModel');

function currentDateTime() {

    let oDate = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + oDate.getDate()).slice(-2);

    // current month
    let month = ("0" + (oDate.getMonth() + 1)).slice(-2);

    // current year
    let year = oDate.getFullYear();

    // current hours
    let hours = ("0" + oDate.getHours()).slice(-2);

    // current minutes
    let minutes = ("0" + oDate.getMinutes()).slice(-2);

    // current seconds
    let seconds = oDate.getSeconds();

    // prints date in YYYY-MM-DD format
    console.log(year + "-" + month + "-" + date);

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    // console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    console.log(year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds);

    let now = year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds;

    // prints time in HH:MM format
    console.log(hours + ":" + minutes);

    console.log("now:", now);

    return now;

}

function createEventId() {
    let d = new Date();
    let utc = d.getTime().toString();
    let id = utc.slice(0, 11);
    return id;
}

function convertObjToRow(reqbody, mode, idUser) {

    console.log("convertObjToRow reqbody:", reqbody);

    let msg = null;
    let eventRow = [];
    let phaseRow = null;
    let oPhase = {};

    console.log("title:", reqbody.title);
    console.log("time.start:", reqbody.time.start);
    console.log("time.end:", reqbody.time.end);
    console.log("warehouse.id:", reqbody.warehouse.id);

    let oEvent = new Event();

    // idEvent
    if (mode === "create") {
        oEvent.id = createEventId();
        eventRow.push(oEvent.id);
    } else {
        oEvent.id = reqbody.id;
        eventRow.push(oEvent.id);
    }

    // idWarehouse
    if (reqbody.warehouse.id != null) { oEvent.warehouse.id = reqbody.warehouse.id }
    else msg = "Не выбран склад отгрузки";
    eventRow.push(oEvent.warehouse.id);


    // title
    if (reqbody.title != null) { oEvent.title = reqbody.title }
    else msg = "Не указано название проекта";
    eventRow.push(oEvent.title);

    // timeEvent
    // start
    if (reqbody.time.start != null) { oEvent.time.start = reqbody.time.start.slice(0, 16) }
    else msg = "Не указана дата начала проекта";
    eventRow.push(oEvent.time.start);
    // end
    if (reqbody.time.end != null) { oEvent.time.end = reqbody.time.end.slice(0, 16) }
    else msg = "Не указано дата окончания проекта";
    eventRow.push(oEvent.time.end);

    // manager
    if (reqbody.manager.id !== null) { oEvent.manager.id = reqbody.manager.id }
    eventRow.push(oEvent.manager.id);

    // creator
    if (reqbody.creator.id !== null) { oEvent.creator.id = reqbody.creator.id }
    eventRow.push(oEvent.creator.id);
    // location
    // idEventCity
    if (reqbody.location.city.id != null) {
        oEvent.location.city.id = reqbody.location.city.id;
    }
    eventRow.push(oEvent.location.city.id);
    // idEventPlace
    if (reqbody.location.place.id != null) {
        oEvent.location.place.id = reqbody.location.place.id;
    }
    eventRow.push(oEvent.location.place.id);

    // client
    if (reqbody.client.id != null) {
        oEvent.client.id = reqbody.client.id;
    }
    eventRow.push(oEvent.client.id);
    // notes
    if (reqbody.notes != null) {
        oEvent.notes = reqbody.notes;
    }
    eventRow.push(oEvent.notes);


    // // status
        if (reqbody.status.id != null) {
            oEvent.status.id = reqbody.status.id;            
        }
        eventRow.push(oEvent.status.id);


    // idUpdatedBy
    oEvent.idUpdatedBy = idUser;
    eventRow.push(oEvent.idUpdatedBy);

    // unixTime
    eventRow.push(Date.now());

    console.log("oEvent:", oEvent);

    // if (reqbody.phase != null) {
    //     phaseRow = [];

    //     for (let i = 0; i < reqbody.phase.length; i++) {
    //         // console.log("reqbody.phase:",reqbody.phase[i]);
    //         let arr = [];
    //         oPhase.idEvent = oEvent.idEvent;
    //         arr.push(oPhase.idEvent);

    //         oPhase.idPhase = reqbody.phase[i].idPhase;
    //         arr.push(oPhase.idPhase);

    //         oPhase.startPhase = reqbody.phase[i].startPhase;
    //         arr.push(oPhase.startPhase);

    //         oPhase.endPhase = reqbody.phase[i].endPhase;
    //         arr.push(oPhase.endPhase);

    //         phaseRow.push(arr);

    //     }

    // } else {
    //     phaseRow = null;
    // }

    console.log("eventRow:", eventRow);

    return [msg, eventRow, phaseRow];


}
function convertRowToObj(row) {

    console.log("convert row:", row);

    let obj = {};

    obj.idEvent = row.idEvent;

    obj.warehouse = {
        idWarehouse: row.idWarehouse,
        warehouseName: row.warehouse
    }

    obj.title = row.title;

    obj.creator = {
        idCreator: row.idCreatedBy,
        nameCreator: row.createdBy
    }

    obj.currentUser = {
        idcurrentUser: row.idUpdatedBy,
        nameCurrentUser: row.updatedBy
    }

    obj.client = {
        idClient: row.idClient,
        clientName: row.client
    }

    obj.status = {
        idStatus: row.idStatus,
        statusName: row.status
    }

    obj.location = {
        idEventCity: row.idEventCity,
        nameEventCity: row.eventCity,
        idEventPlace: row.idEventPlace,
        nameEventPlace: row.eventPlace
    }

    obj.manager = {
        idManager_1: row.idManager_1,
        nameManager_1: row.manager_1,
        idManager_2: row.idManager_2,
        nameManager_2: row.manager_2
    }

    obj.notes = row.notes;

    console.log("convert obj:", obj);

    return obj
}

module.exports = {
    currentDateTime: currentDateTime,
    createEventId: createEventId,
    convertRowToObj: convertRowToObj,
    convertObjToRow: convertObjToRow
};