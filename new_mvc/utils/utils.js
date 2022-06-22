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

function convertObjToRow(reqbody, mode) {

    let eventRow = [];
    let phaseRow = null;
    let oEvent = {};
    let oPhase = {};

    console.log("reqbody:",reqbody);


    // idEvent
    if (mode === "create") {
        oEvent.idEvent = createEventId();
        eventRow.push(oEvent.idEvent);
    }else {
        oEvent.idEvent = reqbody.idEvent;
        eventRow.push(oEvent.idEvent);
    }


    let msg = null;
    // idWarehouse
    if (reqbody.warehouse !== null) {
        if (reqbody.warehouse.idWarehouse != null) { oEvent.idWarehouse = reqbody.warehouse.idWarehouse }
        else msg = "Не указано поле idWarehouse";
        eventRow.push(oEvent.idWarehouse);
    } else msg = "Не указано поле warehouse";

    // title
    if (reqbody.title != null) { oEvent.title = reqbody.title }
    else msg = "Не указано поле название проекта";
    eventRow.push(oEvent.title);

    // timeEvent
    if (reqbody.timeEvent !== null) {
        // start
        if (reqbody.timeEvent.start != null) { oEvent.start = reqbody.timeEvent.start }
        else msg = "Не указано поле даты начала проекта";
        eventRow.push(oEvent.start);
        // end
        if (reqbody.timeEvent.end != null) { oEvent.end = reqbody.timeEvent.end }
        eventRow.push(oEvent.end);
    } else msg = "Не указано поле даты начала проекта";

    // manager
    if (reqbody.manager !== null) {
        // idManager_1
        if (reqbody.manager.idManager_1 != null) {
            oEvent.idManager_1 = reqbody.manager.idManager_1;
        } else oEvent.idManager_1 = 1;
        eventRow.push(oEvent.idManager_1);
        // idManager_2
        if (reqbody.manager.idManager_2 != null) {
            oEvent.idManager_2 = reqbody.manager.idManager_2
        } else oEvent.idManager_2 = 1;
        eventRow.push(oEvent.idManager_2);
    } else {
        oEvent.idManager_1 = 1;
        oEvent.idManager_2 = 1;
        eventRow.push(oEvent.idManager_1);
        eventRow.push(oEvent.idManager_2);
    }

    // location
    if (reqbody.location !== null) {
        // idEventCity
        if (reqbody.location.idEventCity != null) {
            oEvent.idEventCity = reqbody.location.idEventCity;
        } else oEvent.idEventCity = 1;
        eventRow.push(oEvent.idEventCity);
        // idEventPlace
        if (reqbody.location.idEventPlace != null) {
            oEvent.idEventPlace = reqbody.location.idEventPlace;
        } else oEvent.idEventPlace = 1;
        eventRow.push(oEvent.idEventPlace);
    } else {
        oEvent.idEventCity = 1;
        oEvent.idEventPlace = 1;
        eventRow.push(oEvent.idEventCity);
        eventRow.push(oEvent.idEventPlace);
    }

    // client
    if (reqbody.client !== null) {
        if (reqbody.client.idClient != null) {
            oEvent.idClient = reqbody.client.idClient;
        } else oEvent.idClient = 1;
        eventRow.push(oEvent.idClient);
    } else {
        oEvent.idClient = null;
        eventRow.push(oEvent.idClient);
    }

    // creator
    if (reqbody.creator !== null) {
        if (reqbody.creator.idCreator != null) { oEvent.idCreatedBy = reqbody.creator.idCreator }
        else msg = "Не указано поле создателя проекта";
        eventRow.push(oEvent.idCreatedBy);
    } else msg = "Не указано поле создателя проекта";

    // notes
    if (reqbody.notes != null) {
        oEvent.notes = reqbody.notes;
    } else oEvent.notes = "";
    eventRow.push(oEvent.notes);


    // status
    if (reqbody.status !== null) {
        if (reqbody.status.idStatus != null) {
            oEvent.idStatus = reqbody.status.idStatus;
        } else oEvent.idStatus = 1;
        eventRow.push(oEvent.idStatus);
    } else {
        oEvent.idStatus = 1;
        eventRow.push(oEvent.idStatus);
    }

    // idUpdatedBy
    if (reqbody.currentUser !== null) {
        if (reqbody.currentUser.idCurrentUser != null) { oEvent.idUpdatedBy = reqbody.currentUser.idCurrentUser }
        else msg = "Не указано поле текщего пользоваткля";
        eventRow.push(oEvent.idUpdatedBy);
    } else msg = "Не указано поле текщего пользоваткля";


    // unixTime
    eventRow.push(Date.now());

    if (reqbody.phase != null) {
        phaseRow = [];

        for (let i = 0; i < reqbody.phase.length; i++) {
            // console.log("reqbody.phase:",reqbody.phase[i]);
            let arr = [];
            oPhase.idEvent = oEvent.idEvent;
            arr.push(oPhase.idEvent);

            oPhase.idPhase = reqbody.phase[i].idPhase;
            arr.push(oPhase.idPhase);

            oPhase.startPhase = reqbody.phase[i].startPhase;
            arr.push(oPhase.startPhase);

            oPhase.endPhase = reqbody.phase[i].endPhase;
            arr.push(oPhase.endPhase);

            phaseRow.push(arr);

        }

    } else {
        phaseRow = null;
    }

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