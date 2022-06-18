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

function validateInputData(data) {
    console.log("validate data.title:", data.title);
    console.log("validate data.idWarehouse:", data.idWarehouse);
    if ((data.title != null) && (data.idWarehouse != null)) {
        return true;
    } else return false;
}

function convertObjToRow(reqbody) {

    let eventRow = [];
    let phaseRow = null;
    let oEvent = {};
    let oPhase = {};


    // idEvent
    oEvent.idEvent = createEventId();
    eventRow.push(oEvent.idEvent);

    let msg = null;
    // idWarehouse
    if (reqbody.warehouse.idWarehouse != null) { oEvent.idWarehouse = reqbody.warehouse.idWarehouse }
    else msg = "Не указано поле idWarehouse";
    eventRow.push(oEvent.idWarehouse);
    // title
    if (reqbody.title != null) { oEvent.title = reqbody.title }
    else msg = "Не указано поле название проекта";
    eventRow.push(oEvent.title);
    // start
    if (reqbody.timeEvent.start != null) { oEvent.start = reqbody.timeEvent.start }
    else msg = "Не указано поле даты начала проекта";
    eventRow.push(oEvent.start);
    // end
    if (reqbody.timeEvent.end != null) { oEvent.end = reqbody.timeEvent.end }
    eventRow.push(oEvent.end);
    // idManager_1
    if (reqbody.manager.idManager_1 != null) { oEvent.idManager_1 = reqbody.manager.idManager_1 }
    eventRow.push(oEvent.idManager_1);
    // idManager_2
    if (reqbody.manager.idManager_2 != null) { oEvent.idManager_2 = reqbody.manager.idManager_2 }
    eventRow.push(oEvent.idManager_2);
    // idEventCity
    if (reqbody.location.idEventCity != null) { oEvent.idEventCity = reqbody.location.idEventCity }
    eventRow.push(oEvent.idEventCity);
    // idEventPlace
    if (reqbody.location.idEventPlace != null) { oEvent.idEventPlace = reqbody.location.idEventPlace }
    eventRow.push(oEvent.idEventPlace);
    // idClient
    if (reqbody.client.idClient != null) { oEvent.idClient = reqbody.client.idClient }
    eventRow.push(oEvent.idClient);
    // idCreatedBy
    if (reqbody.creator.idCreator != null) { oEvent.idCreatedBy = reqbody.creator.idCreator }
    else msg = "Не указано поле создателя проекта";
    eventRow.push(oEvent.idCreatedBy);
    // notes
    if (reqbody.notes != null) { oEvent.notes = reqbody.notes }
    eventRow.push(oEvent.notes);
    // idStatus
    if (reqbody.status.idStatus != null) { oEvent.idStatus = reqbody.status.idStatus }
    eventRow.push(oEvent.idStatus);
    // idUpdatedBy
    eventRow.push(oEvent.idCreatedBy);

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

    }

    return [msg, eventRow, phaseRow];

}

module.exports = {
    currentDateTime: currentDateTime,
    createEventId: createEventId,
    validateInputData: validateInputData,
    convertObjToRow: convertObjToRow
};