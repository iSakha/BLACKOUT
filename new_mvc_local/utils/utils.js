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


// EVENT destructor
// ===========================================================
function convertObjToRow(reqbody, mode, idUser, idEvent) {

    console.log("convertObjToRow reqbody:", reqbody);

    // msg - check required fields such as warehouse, title, datetime
    let msg = null;
    let eventRow = [];
    let oPhase = {};
    let phaseRow = null;
    let oBook = {};
    let bookRow = null;


    console.log("title:", reqbody.title);
    console.log("time.start:", reqbody.time.start);
    console.log("time.end:", reqbody.time.end);
    // console.log("warehouse.id:", reqbody.warehouse.id);

    // CREATE EVENT
    // ===========================================================

    let oEvent = new Event();

    // idEvent
    if (mode === "create") {
        oEvent.id = createEventId();
        console.log("oEvent.id:", oEvent.id);
        eventRow.push(oEvent.id);
    } else {
        oEvent.id = idEvent;
        console.log("oEvent.id_else:", oEvent.id);
        eventRow.push(oEvent.id);
    }

    // idWarehouse
    if (reqbody.warehouse != null) {
        oEvent.warehouse.id = reqbody.warehouse.id;
        eventRow.push(oEvent.warehouse.id);
    } else msg = "Не выбран склад отгрузки";

    // title
    if (reqbody.title != null) { oEvent.title = reqbody.title }
    else msg = "Не указано название проекта";
    eventRow.push(oEvent.title);

    // timeEvent
    // start
    if (reqbody.time.start != undefined) { oEvent.time.start = reqbody.time.start.slice(0, 16) }
    else msg = "Не указана дата начала проекта";
    eventRow.push(oEvent.time.start);
    // end
    if (reqbody.time.end != undefined) { oEvent.time.end = reqbody.time.end.slice(0, 16) }
    else msg = "Не указано дата окончания проекта";
    eventRow.push(oEvent.time.end);

    // manager
    if (reqbody.manager !== undefined) { oEvent.manager.id = reqbody.manager.id }
    eventRow.push(oEvent.manager.id);

    // location
    // idEventCity
    if (reqbody.location != undefined) {
        if (reqbody.location.city != undefined) {
            oEvent.location.city.id = reqbody.location.city.id;
        } else { eventRow.push(oEvent.location.city.id); }
        eventRow.push(oEvent.location.city.id);
        // idEventPlace
        if (reqbody.location.place != undefined) {
            oEvent.location.place.id = reqbody.location.place.id;
        } else { eventRow.push(oEvent.location.place.id); }
        eventRow.push(oEvent.location.place.id);
    } else {
        eventRow.push(oEvent.location.city.id);
        eventRow.push(oEvent.location.place.id);
    }

    // client
    if (reqbody.client != undefined) {
        oEvent.client.id = reqbody.client.id;
    }
    eventRow.push(oEvent.client.id);

    // creator
    if (reqbody.creator !== undefined) { oEvent.creator.id = reqbody.creator.id }
    eventRow.push(oEvent.creator.id);


    // notes
    if (reqbody.notes != undefined) {
        oEvent.notes = reqbody.notes;
    }
    eventRow.push(oEvent.notes);


    // status
    if (reqbody.status != undefined) {
        oEvent.status.id = reqbody.status.id;
    }
    eventRow.push(oEvent.status.id);


    // idUpdatedBy
    oEvent.idUpdatedBy = idUser;
    eventRow.push(oEvent.idUpdatedBy);

    // unixTime
    oEvent.unixTime = Date.now();
    eventRow.push(oEvent.unixTime);

    console.log("oEvent:", oEvent);

    // CREATE PHASE
    // ===========================================================

    if (reqbody.phase != null) {
        phaseRow = [];

        for (let i = 0; i < reqbody.phase.length; i++) {
            // console.log("reqbody.phase:",reqbody.phase[i]);
            let arr = [];

            // idEvent
            oPhase.idEvent = oEvent.id;
            arr.push(oPhase.idEvent);

            // idPhase
            oPhase.idPhase = reqbody.phase[i].id;
            arr.push(oPhase.idPhase);

            // startPhase
            oPhase.startPhase = reqbody.phase[i].start.slice(0, 16);
            arr.push(oPhase.startPhase);

            // endPhase
            oPhase.endPhase = reqbody.phase[i].end.slice(0, 16);
            arr.push(oPhase.endPhase);

            // idUser
            oPhase.idUser = idUser;
            arr.push(oPhase.idUser);

            // unixTime
            oPhase.unixTime = oEvent.unixTime;
            arr.push(oPhase.unixTime);

            phaseRow.push(arr);

        }

    } else {
        phaseRow = null;
    }

    console.log("eventRow:", eventRow);

    // CREATE BOOKED EQUIPMENT
    // ===========================================================

    if (reqbody.booking != null) {

        bookRow = [];

        for (let i = 0; i < reqbody.booking.length; i++) {
            let arr = [];

            oBook.idEvent = oEvent.id;
            arr.push(oBook.idEvent);

            oBook.id = reqbody.booking[i].id + ".0000";
            arr.push(oBook.id);

            oBook.qtt = reqbody.booking[i].qtt;
            arr.push(oBook.qtt);

            oBook.idWh = oEvent.warehouse.id;
            arr.push(oBook.idWh);

            oBook.userId = oEvent.creator.id;
            arr.push(oBook.userId);

            oBook.unixTime = oEvent.unixTime;
            arr.push(oBook.unixTime);



            bookRow.push(arr);

        }

        console.log("bookRow:", bookRow);

    }

    return [msg, eventRow, phaseRow, bookRow];


}

// EVENT constructor
// ===========================================================
function convertRowToObj(row) {

    console.log("convert row:", row);

    let obj = {};

    obj.id = row.idEvent;

    obj.time = {
        start: row.start,
        end: row.end
    }

    obj.warehouse = {
        id: row.idWarehouse,
        name: row.warehouse
    }

    obj.title = row.title;

    obj.creator = {
        id: row.idCreatedBy,
        name: row.createdBy
    }

    // obj.currentUser = {
    //     idcurrentUser: row.idUpdatedBy,
    //     nameCurrentUser: row.updatedBy
    // }

    obj.client = {
        id: row.idClient,
        name: row.client
    }

    obj.status = {
        id: row.idStatus,
        name: row.status
    }


    let city = {};
    let place = {};
    city.id = row.idEventCity;
    city.name = row.eventCity;
    place.id = row.idEventPlace;
    place.name = row.eventPlace

    obj.location = {
        city,
        place
    }


    obj.manager = {
        id: row.idManager_1,
        name: row.manager_1,
    }

    obj.notes = row.notes;

    console.log("convert obj:", obj);

    return obj
}

function convertLocationsToObj(locations) {
    console.log("convertLocationsToObj:", locations);


    let arrLocations = [];

    for (let i = 0; i < locations.length; i++) {
        let oLocation = {};
        let oCity = { id: 1, name: null };
        let oPlace = { id: 1, name: null };

        oCity.id = locations[i].idCity;
        oCity.name = locations[i].city;
        oPlace.id = locations[i].idPlace;
        oPlace.name = locations[i].place;
        oLocation.city = oCity;
        oLocation.place = oPlace;

        arrLocations.push(oLocation);
    }

    return arrLocations;
}

// Update multiple rows
// =======================================================================
function updateMultiple(idWarehouse, idFixture) {
    let query_1 = "UPDATE t_equipment SET idWarehouse = CASE ";
    let query_2 = "";
    let query_4 = "";

    for (let i = 0; i < idFixture.length; i++) {
        query_2 += " WHEN idFixture = '" + idFixture[i] + "' THEN " + idWarehouse;
        if (i < idFixture.length - 1) {
            query_4 += "'" + idFixture[i] + "'" + ",";
        } else query_4 += "'" + idFixture[i] + "'";

    }

    let query_3 = " END  WHERE idFixture IN ("

    let q = query_1 + query_2 + query_3 + query_4 + ")";

    return q;
}


function modelsMovement(idWhOut, idModel, modelQty) {
    let query = "";

    for (let i = 0; i < idModel.length; i++) {
        query += "(SELECT * FROM `t_equipment` WHERE idWarehouse=" + idWhOut + " AND idFixture LIKE '" + idModel[i] + "'" + " LIMIT " + modelQty[i] + ")";
        if (i < idModel.length - 1) {
            query += " UNION "
        }
    }
    console.log(query);
    return query;
}

module.exports = {
    currentDateTime: currentDateTime,
    createEventId: createEventId,
    convertRowToObj: convertRowToObj,
    convertObjToRow: convertObjToRow,
    convertLocationsToObj: convertLocationsToObj,
    updateMultiple: updateMultiple,
    modelsMovement: modelsMovement
};