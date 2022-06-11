const HOST = 'http://127.0.0.1';
// const HOST = 'http://82.209.203.205';
const PORT = 3070;
const URL = HOST + ':' + PORT;

let eventLocations = {};
let selectedEventId;

let accessToken;
let refreshToken;

let oUsers = {};

let idUser;


// document.addEventListener('DOMContentLoaded', init);

document.getElementById('btn-login').addEventListener('click', loginUser);

// dependent dropdown lists (event city => event place)
//============================================================
document.getElementById('select-event-city').addEventListener('change', (e) => {
    let selectEventPlace = document.getElementById('select-event-place');
    let city = e.target.options[e.target.selectedIndex].text;

    console.log("city:", city);
    let place = eventLocations.filter((p) => {
        return p.city == city;
    })
    console.log("place:", place);

    loadSelectSource(place, selectEventPlace);

});

// Change date 
//====================================================================

document.getElementById('date-event-start').addEventListener('change', () => {
    document.getElementById('date-event-end').value = document.getElementById('date-event-start').value;
});


// // Event object  
// //====================================================================

// document.getElementById('txt-event-title').addEventListener('change', (e) => {
//     if (e.target.value) {
//         eventObj.title = e.target.value;
//     } else {
//         delete eventObj.title;
//     };
// });

// document.getElementById('date-event-start').addEventListener('change', (e) => {
//     if (e.target.value) {
//         eventObj.start = e.target.value;
//     } else {
//         delete eventObj.start;
//     };
// });

// document.getElementById('date-event-end').addEventListener('change', (e) => {
//     if (e.target.value) {
//         eventObj.end = e.target.value;
//     } else {
//         delete eventObj.end;
//     };
// });

// document.getElementById('select-whouse').addEventListener('change', (e) => {
//     if (e.target.value) {
//         eventObj.idWarehouse = e.target.value;
//     } else {
//         delete eventObj.idWarehouse;
//     };
// });

// document.getElementById('txt-notes').addEventListener('change', (e) => {
//     if (e.target.value) {
//         eventObj.notes = e.target.value;
//     } else {
//         delete eventObj.notes;
//     };
// });

// document.getElementById('select-event-city').addEventListener('change', (e) => {
//     if (e.target.value) {
//         eventObj.idEventCity = e.target.value;
//     } else {
//         delete eventObj.idEventCity;
//     };
// });

// document.getElementById('select-event-place').addEventListener('change', (e) => {
//     if (e.target.value) {
//         eventObj.idEventPlace = e.target.value;
//     } else {
//         delete eventObj.idEventPlace;
//     };
// });

// document.getElementById('select-event-client').addEventListener('change', (e) => {
//     if (e.target.value) {
//         eventObj.idClient = e.target.value;
//     } else {
//         delete eventObj.idClient;
//     };
// });

// document.getElementById('select-manager-1').addEventListener('change', (e) => {
//     if (e.target.value) {
//         eventObj.idManager_1 = e.target.value;
//     } else {
//         delete eventObj.idManager_1;
//     };
// });

// document.getElementById('select-manager-2').addEventListener('change', (e) => {
//     if (e.target.value) {
//         eventObj.idManager_2 = e.target.value;
//     } else {
//         delete eventObj.idManager_2;
//     };
// });

// document.getElementById('select-status').addEventListener('change', (e) => {
//     if (e.target.value) {
//         eventObj.idStatus = e.target.value;
//     } else {
//         delete eventObj.idStatus;
//     };
// });

document.getElementById('btn-event-details').addEventListener('click', () => {
    document.getElementsByClassName('phase-div')[0].classList.remove('d-none');
    document.getElementsByClassName('phase-div')[1].classList.remove('d-none');
});


//          C R U D buttons
//=====================================================================

//  CREATE Event 
//=====================================================================
document.getElementById('btn-event-create').addEventListener('click', createEvent);

//  UPDATE Event 
//=====================================================================
document.getElementById('btn-event-update').addEventListener('click', updateEvent);

//  Get All Events 
//=====================================================================
document.getElementById('btn-event-read').addEventListener('click', getAllEvents);

//  Get One Event 
//=====================================================================
tblBody = document.getElementById('tbl-body-events');
tblBody.addEventListener('click', (e) => {
    // console.log(e.target);
    let td = e.target;
    let row = td.parentNode;
    let id = row.children[0].innerHTML;
    getOne(id);


});

//          F U N C T I O N S
// --------------------------------------------------------------------
// --------------------------------------------------------------------

//  Init function 
//=====================================================================
function init() {

    checkConnectionToMySQL();

    // set today date
    document.getElementById('date-event-start').valueAsDate = new Date();
    document.getElementById('date-event-end').valueAsDate = new Date();

}

//  Login function 
//=====================================================================
function loginUser() {
    console.log('==========================================');
    console.log('Login user');
    console.log('POST http://127.0.0.1:3070/login');
    let login = document.getElementById('txt-login').value;
    let pass = document.getElementById('txt-pass').value;

    let userObj = {};
    userObj.login = login;
    userObj.pass = pass;

    fetch(URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObj)
    })
        .then(console.log(userObj))
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if ((data.accessToken != null) && (data.refreshToken != null)) {
                document.getElementById('lbl-user').innerHTML = "<h3>USER: " + userObj.login + "</h3>";

                accessToken = data.accessToken;
                refreshToken = data.refreshToken;
            } else {
                alert('Wrong password or login!');
                document.getElementById('txt-login').value = "";
                document.getElementById('txt-pass').value = "";
            }

        })
        .then(init)
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })


}

//  CheckConnectionToMySQL function 
//=====================================================================
function checkConnectionToMySQL() {

    console.log('==========================================');
    console.log('Check connection to MySQL database');
    console.log('GET http://127.0.0.1:3070/checkDBconn');

    fetch(URL + '/checkDBconn', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log("result:", data);
            getListWarehouses();
        })

        // .then(loadStatus)
        .catch(error => {
            console.log("error:", error)
        })
}

//  GetListWarehouses function 
//=====================================================================
function getListWarehouses() {

    console.log(" ");
    console.log('==========================================');
    console.log('Get list of warehouses');
    console.log('GET http://127.0.0.1:3070/warehouses');

    let selectWhouse = document.getElementById('select-whouse');

    fetch(URL + '/warehouses', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log("warehouses:", data);
            loadSelectSource(data, selectWhouse);
        })
        .then(getListLocations)
        .catch(error => {
            console.log("error:", error)
        })
}

//  GetListLocations function 
//=====================================================================
function getListLocations() {
    console.log(" ");
    console.log('==========================================');
    console.log('Get list of locations');
    console.log('GET http://127.0.0.1:3070/events/locations');


    let selectCity = document.getElementById('select-event-city');

    fetch(URL + '/events/locations', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => {
            eventLocations = data;
            console.log("locations:", data);
            // remove cities duplicates
            const table = {};
            const cities = eventLocations.filter(({ city }) => (!table[city] && (table[city] = 1)));
            console.log("distinct cities:", cities);
            loadSelectSource(cities, selectCity);
        })
        .then(getListClients)
        .catch(error => {
            console.log("error:", error)
        })
}

//  GetListClients function 
//=====================================================================
function getListClients() {
    console.log(" ");
    console.log('==========================================');
    console.log('Get list of clients');
    console.log('GET http://127.0.0.1:3070/events/clients');


    let selectClient = document.getElementById('select-event-client');

    fetch(URL + '/events/clients', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log("clients:", data);
            loadSelectSource(data, selectClient);
        })
        .then(getListManagers)
        .catch(error => {
            console.log("error:", error)
        })
}

//  GetListManagers function 
//=====================================================================
function getListManagers() {
    console.log(" ");
    console.log('==========================================');
    console.log('Get list of users');
    console.log('GET http://127.0.0.1:3070/events/users');


    let selectManager_1 = document.getElementById('select-manager-1');
    let selectManager_2 = document.getElementById('select-manager-2');
    fetch(URL + '/events/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log("users:", data);
            oUsers = data;
            loadSelectSource(oUsers, selectManager_1);
            loadSelectSource(oUsers, selectManager_2);
            getCurrentUser(oUsers);
        })
        .then(getListStatus)
        .catch(error => {
            console.log("error:", error)
        })
}

function getCurrentUser(oUsers) {

    console.log("oUsers:", oUsers);
    let currentUserLogin = document.getElementById('lbl-user').innerText.slice(6);
    let oUser = oUsers.find(e => e.login === currentUserLogin);
    let user = oUser.fullName;
    idUser = oUser.id
    console.log("idUser:", idUser);
    document.getElementById('txt-event-user').value = user;

}

//  GetListStatus function 
//=====================================================================
function getListStatus() {
    console.log(" ");
    console.log('==========================================');
    console.log('Get list of status');
    console.log('GET http://127.0.0.1:3070/events/status');


    let selectStatus = document.getElementById('select-status');

    fetch(URL + '/events/status', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log("status:", data);
            loadSelectSource(data, selectStatus);
        })
        .then(getListPhases)
        .catch(error => {
            console.log("error:", error)
        })
}

//  GetListPhases function 
//=====================================================================
async function getListPhases() {
    let valid = await checkExpirationToken();

    switch (valid) {
        case true:
            console.log(" ");
            console.log('==========================================');
            console.log('Get list of phases');
            console.log('GET http://127.0.0.1:3070/events/phase');

            console.log("accessToken:", accessToken);

            fetchPhases(accessToken);

            break;

        case false:

            console.log("before update accessToken:", accessToken);

            updateToken()
                .then(() => fetchPhases(accessToken))
            break;
    }
}

//  Create data source input function 
//=====================================================================

function loadSelectSource(data, select) {
    console.log("phases:", data);
    select.innerHTML = "";
    let opt;
    if ((select.id == 'select-whouse') || (select.id == 'select-event-city') || (select.id == 'select-event-place')) {
        opt = document.createElement('option');
        opt.innerHTML = "";
        select.appendChild(opt);
    }

    for (let i = 0; i < data.length; i++) {
        opt = document.createElement('option');
        switch (select.id) {
            case 'select-whouse':
                opt.innerHTML = data[i].warehouse;
                opt.value = data[i].id;
                break;
            case 'select-event-city':
                opt.innerHTML = data[i].city;
                opt.value = data[i].idCity;
                break;
            case 'select-event-place':
                opt.innerHTML = data[i].place;
                opt.value = data[i].idPlace;
                break;
            case 'select-event-client':
                opt.innerHTML = data[i].client;
                opt.value = data[i].id;
                break;
            case 'select-manager-1':
            case 'select-manager-2':
                opt.innerHTML = data[i].fullName;
                opt.value = data[i].id;
                break;
            case 'select-status':
                opt.innerHTML = data[i].status;
                opt.value = data[i].id;
                break;
            case 'select-phase':
                opt.innerHTML = data[i].phase;
                opt.value = data[i].id;
                break;
        }

        select.appendChild(opt);

    }
}

//  Create event table function 
//=====================================================================
function createEventTable(data) {
    console.log(" ");
    console.log('==========================================');
    console.log('createEventTable');
    console.log("data for table: ", data);

    let tbl = document.getElementById('tbl-events');
    let tblBody = document.getElementById('tbl-body-events');
    tblBody.innerHTML = "";
    let row;
    let cell;

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {

            row = document.createElement('tr');

            cell = document.createElement("td");
            cell.innerHTML = data[i].idEvent;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].title;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].warehouse;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].start.slice(0, 16);
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].end.slice(0, 16);
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].eventCity;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].eventPlace;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].client;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].manager_1;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].manager_2;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].status;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].notes;
            row.appendChild(cell);

            tblBody.appendChild(row);

        }
        tbl.append(tblBody);
    }
}

//  Fill Event Form function 
//=====================================================================
function fillEventForm(event) {
    console.log(" ");
    console.log('==========================================');
    console.log('Fill event form');
    console.log("event:", event);

    document.getElementById('txt-event-id').value = event[0].idEvent;
    document.getElementById('txt-event-title').value = event[0].title;
    document.getElementById('txt-event-user').value = event[0].createdBy;
    document.getElementById('date-event-start').value = event[0].start.slice(0, 10);
    document.getElementById('date-event-end').value = event[0].end.slice(0, 10);

    document.getElementById('txt-time-start-h').value = event[0].start.slice(11, 13);
    document.getElementById('txt-time-start-m').value = event[0].start.slice(14, 16);
    document.getElementById('txt-time-end-h').value = event[0].end.slice(11, 13);
    document.getElementById('txt-time-end-m').value = event[0].end.slice(14, 16);


    document.getElementById('select-whouse').selectedIndex = event[0].idWarehouse;
    document.getElementById('txt-notes').value = event[0].notes;
    document.getElementById('select-event-city').selectedIndex = event[0].idEventCity - 2;
    // document.getElementById('select-event-place').selectedIndex
    document.getElementById('select-event-client').selectedIndex = event[0].idClient - 1;
    document.getElementById('select-manager-1').selectedIndex = event[0].idManager_1 - 1;
    document.getElementById('select-manager-2').selectedIndex = event[0].idManager_2 - 1;
    document.getElementById('select-status').selectedIndex = event[0].idStatus - 1;
}

//  Display summary function 
//=====================================================================
function displaySummary(data) {

    console.log(" ");
    console.log('==========================================');
    console.log('Display Summary');
    console.log("sumEvents:", data)

    document.getElementById('sum-total-minsk').innerHTML = "Всего: " + data[0].qty;
    document.getElementById('sum-total-moscow').innerHTML = "Всего: " + data[1].qty;
    document.getElementById('sum-total-kazan').innerHTML = "Всего: " + data[2].qty;
    document.getElementById('sum-total-piter').innerHTML = "Всего: " + data[3].qty;

    document.getElementById('sum-current-minsk').innerHTML = "На сегодня: " + data[0].qty_current;
    document.getElementById('sum-current-moscow').innerHTML = "На сегодня: " + data[1].qty_current;
    document.getElementById('sum-current-kazan').innerHTML = "На сегодня: " + data[2].qty_current;
    document.getElementById('sum-current-piter').innerHTML = "На сегодня: " + data[3].qty_current;

    document.getElementById('sum-future-minsk').innerHTML = "Будет: " + data[0].qty_future;
    document.getElementById('sum-future-moscow').innerHTML = "Будет: " + data[1].qty_future;
    document.getElementById('sum-future-kazan').innerHTML = "Будет: " + data[2].qty_future;
    document.getElementById('sum-future-piter').innerHTML = "Будет: " + data[3].qty_future;
}

//  CheckExpirationToken function 
//=====================================================================
async function checkExpirationToken() {

    console.log(" ");
    console.log('==========================================');
    console.log('checkExpirationToken');
    let valid;

    if (accessToken) {

        const jwtPayload = JSON.parse(window.atob(accessToken.split('.')[1]));

        console.log("jwtPayload", jwtPayload);
        console.log("jwtPayload.exp:", jwtPayload.exp * 1000);
        console.log("Date.now():", Date.now());

        if (Date.now() > jwtPayload.exp * 1000) {
            valid = false;
        } else valid = true;

        return valid;

    }
}

//  updateToken function 
//=====================================================================
function updateToken() {

    let p = new Promise((resolve, reject) => {

        console.log(" ");
        console.log('==========================================');
        console.log('Update token');
        console.log('POST http://127.0.0.1:3070/login/updatejwt');
        let tokenObj = {};

        console.log("old refreshToken:", refreshToken);

        tokenObj.token = refreshToken;

        console.log("refreshTokenObj:", tokenObj);

        fetch(URL + '/login/updatejwt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tokenObj)
        })
            .then(console.log("tokenObj:", tokenObj))
            .then(res => res.json())
            .then(data => {

                if ((data.accessToken != null) && (data.refreshToken != null)) {
                    console.log("We've got new tokens");
                    console.log("updated tokens:", data);
                    accessToken = data.accessToken;
                    refreshToken = data.refreshToken;

                    // fetchAllEvents(accessToken);
                    resolve(accessToken);

                } else {
                    alert('Something goes wrong!');
                }

            })
            .catch(error => {
                // enter your logic for when there is an error (ex. error toast)
                console.log(error)
            })
    })

    return p;



}

//  FETCH functions 
//=====================================================================
//=====================================================================
function fetchAllEvents(token) {
    let events;
    fetch(URL + '/events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        }
    })
        .then(res => res.json())
        .then(data => {
            events = data
            console.log("events:", data)
            createEventTable(events);
            document.getElementById('event-tbl-div').classList.remove('d-none');
            document.getElementById('summary-div').classList.remove('d-none');
        })
        .then(getSummary)
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log("error:", error);
        })
    return events;
}


function fetchOneEvent(token, idEvent) {
    let event;
    fetch(URL + '/events/id/' + idEvent, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        }
    })
        .then(res => res.json())
        .then(data => {
            event = data
            console.log("get one event:", data)
            fillEventForm(event)
        })
        // .then()
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log("error:", error);
        })
    return event;
}



function fetchNewEvent(token, eventObj) {
    console.log("fetchNewEvent eventObj:" ,eventObj);
    fetch(URL + '/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken

        },
        body: JSON.stringify(eventObj)
    })
        .then(res => res.json())
        .then(data => {
            console.log("data:", data);
        })
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}

function fetchUpdateEvent(token) {
    fetch(URL + '/events', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken

        },
        body: JSON.stringify(eventObj)
    })
        .then(res => res.json())
        .then(data => {
            console.log("data:", data);
        })
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}

function fetchPhases(token) {
    let selectPhase = document.getElementById('select-phase');
    let phases = {};
    fetch(URL + '/events/phase', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        }
    })
        .then(res => res.json())
        .then(data => {
            phases = data
            // console.log("phases:", phases);
            loadSelectSource(phases, selectPhase)
        })
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log("error:", error);
        })
    return phases;
}

//  CRUD functions 
//=====================================================================
//=====================================================================

//  CREATE Event function
//=====================================================================

async function createEvent() {

    let eventObj = {};

    if (document.getElementById('txt-event-id').value != "") {
        eventObj.idEvent = document.getElementById('txt-event-id').value;
    } else eventObj.idEvent = null;

    if (document.getElementById('txt-event-title').value != "") {
        eventObj.title = document.getElementById('txt-event-title').value;
    } else eventObj.title = null;

    if (document.getElementById('select-whouse').value >= 1) {
        eventObj.idWarehouse = parseInt(document.getElementById('select-whouse').value);
    } else eventObj.idWarehouse = null;

    eventObj.idCreatedBy = idUser;
    eventObj.idUpdatedBy = idUser;

    let startDate = document.getElementById('date-event-start').value;
    let endDate = document.getElementById('date-event-end').value;

    let hourStart = document.getElementById('txt-time-start-h').value;
    let hourEnd = document.getElementById('txt-time-end-h').value;
    let minStart = document.getElementById('txt-time-start-m').value;
    let minEnd = document.getElementById('txt-time-end-m').value;

    eventObj.start = startDate + "T" + hourStart + ":" + minStart + ":00";
    eventObj.end = endDate + "T" + hourEnd + ":" + minEnd + ":00";

    if (document.getElementById('txt-notes').value != "") {
        eventObj.notes = document.getElementById('txt-notes').value;
    } else eventObj.notes = null;

    if (document.getElementById('select-manager-1').value > 1) {
        eventObj.idManager_1 = parseInt(document.getElementById('select-manager-1').value);
    } else eventObj.idManager_1 = null;

    if (document.getElementById('select-manager-2').value > 1) {
        eventObj.idManager_2 = parseInt(document.getElementById('select-manager-2').value);
    } else eventObj.idManager_2 = null;

    if (document.getElementById('select-event-city').value > 1) {
        eventObj.idEventCity = parseInt(document.getElementById('select-event-city').value);
    } else eventObj.idEventCity = null;

    if (document.getElementById('select-event-place').value > 1) {
        eventObj.idEventPlace = parseInt(document.getElementById('select-event-place').value);
    } else eventObj.idEventPlace = null;

    if (document.getElementById('select-event-client').value > 1) {
        eventObj.idClient = parseInt(document.getElementById('select-event-client').value);
    } else eventObj.idClient = null;

    if (document.getElementById('select-status').value > 1) {
        eventObj.idStatus = parseInt(document.getElementById('select-status').value);
    } else eventObj.idStatus = null;

    eventObj.idPhase = null;
    eventObj.phaseTimeStart = null;
    eventObj.phaseTimeEnd = null;
    eventObj.filledUp = null;

    console.log("createEvent eventObj:", eventObj)

    let valid = await checkExpirationToken();
    switch (valid) {
        case true:
            console.log(" ");
            console.log('==========================================');
            console.log('Create event');
            console.log('POST http://127.0.0.1:3070/events');

            console.log("accessToken:", accessToken);

            fetchNewEvent(accessToken, eventObj);

            break;

        case false:

            console.log("before update accessToken:", accessToken);

            updateToken()
                .then(() => fetchNewEvent(accessToken, eventObj))

            break;
    }

}

async function updateEvent() {

    let eventObj = {};

    if (document.getElementById('txt-event-id').value != "") {
        eventObj.idEvent = document.getElementById('txt-event-id').value;
    } else eventObj.idEvent = null;

    if (document.getElementById('txt-event-title').value != "") {
        eventObj.title = document.getElementById('txt-event-title').value;
    } else eventObj.title = null;

    if (document.getElementById('select-whouse').value >= 1) {
        eventObj.idWarehouse = parseInt(document.getElementById('select-whouse').value);
    } else eventObj.idWarehouse = null;

    eventObj.createdBy = document.getElementById('txt-event-user').value;
    eventObj.idCreatedBy = oUsers.find(e => e.fullName === eventObj.createdBy);

    console.log("idCreatedBy:",eventObj.idCreatedBy)

    eventObj.idUpdatedBy = idUser;

    let startDate = document.getElementById('date-event-start').value;
    let endDate = document.getElementById('date-event-end').value;

    let hourStart = document.getElementById('txt-time-start-h').value;
    let hourEnd = document.getElementById('txt-time-end-h').value;
    let minStart = document.getElementById('txt-time-start-m').value;
    let minEnd = document.getElementById('txt-time-end-m').value;

    eventObj.start = startDate + "T" + hourStart + ":" + minStart + ":00";
    eventObj.end = endDate + "T" + hourEnd + ":" + minEnd + ":00";

    if (document.getElementById('txt-notes').value != "") {
        eventObj.notes = document.getElementById('txt-notes').value;
    } else eventObj.notes = null;

    if (document.getElementById('select-manager-1').value >= 1) {
        eventObj.idManager_1 = parseInt(document.getElementById('select-manager-1').value);
    } else eventObj.idManager_1 = null;

    if (document.getElementById('select-manager-2').value >= 1) {
        eventObj.idManager_2 = parseInt(document.getElementById('select-manager-2').value);
    } else eventObj.idManager_2 = null;

    if (document.getElementById('select-event-city').value >= 1) {
        eventObj.idEventCity = parseInt(document.getElementById('select-event-city').value);
    } else eventObj.idEventCity = null;

    if (document.getElementById('select-event-place').value >= 1) {
        eventObj.idEventPlace = parseInt(document.getElementById('select-event-place').value);
    } else eventObj.idEventPlace = null;

    if (document.getElementById('select-event-client').value >= 1) {
        eventObj.idClient = parseInt(document.getElementById('select-event-client').value);
    } else eventObj.idClient = null;

    if (document.getElementById('select-status').value >= 1) {
        eventObj.idStatus = parseInt(document.getElementById('select-status').value);
    } else eventObj.idStatus = null;

    eventObj.idPhase = null;
    eventObj.phaseTimeStart = null;
    eventObj.phaseTimeEnd = null;
    eventObj.filledUp = null;

    console.log("updateEvent eventObj:", eventObj);

    // let valid = await checkExpirationToken();
    // switch (valid) {
    //     case true:
    //         console.log(" ");
    //         console.log('==========================================');
    //         console.log('Create event');
    //         console.log('POST http://127.0.0.1:3070/events');

    //         console.log("accessToken:", accessToken);

    //         // fetchUpdateEvent(accessToken);

    //         break;

    //     case false:

    //         console.log("before update accessToken:", accessToken);

    //         updateToken()
    //             .then(() => fetchNewEvent(accessToken))

    //         break;
    // }

}

//  GET All Events function
//=====================================================================
async function getAllEvents() {

    let valid = await checkExpirationToken();

    switch (valid) {
        case true:
            console.log(" ");
            console.log('==========================================');
            console.log('GET All Events');
            console.log('GET http://127.0.0.1:3070/events');

            console.log("accessToken:", accessToken);


            fetchAllEvents(accessToken);

            break;

        case false:

            console.log("before update accessToken:", accessToken);

            updateToken()
                .then(() => fetchAllEvents(accessToken))
            break;
    }

}

//  GET One function
//=====================================================================
async function getOne(idEvent) {
    console.log("idEvent:", idEvent);
    let valid = await checkExpirationToken();

    switch (valid) {
        case true:
            console.log(" ");
            console.log('==========================================');
            console.log('GET All Events');
            console.log('GET http://127.0.0.1:3070/events/id' + idEvent);

            console.log("accessToken:", accessToken);


            fetchOneEvent(accessToken, idEvent);

            break;

        case false:

            console.log("before update accessToken:", accessToken);

            updateToken()
                .then(() => fetchOneEvent(accessToken, idEvent))
            break;
    }
}

//  GET summary function
//=====================================================================
async function getSummary() {
    let sumEvents;
    console.log(" ");
    console.log('==========================================');
    console.log('GET Summary');
    console.log('GET http://127.0.0.1:3070/events/summary');

    fetch(URL + '/events/summary', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            sumEvents = data;
            console.log("sumEvents1:", sumEvents)
            displaySummary(sumEvents);
        })
        .catch(error => {
            console.log("error:", error);
        })
    return sumEvents;
}
