const HOST = 'http://127.0.0.1';
// const HOST = 'http://82.209.203.205';
const PORT = 3070;
const URL = HOST + ':' + PORT;

let eventLocations = {};
let eventObj = {};
let selectedEventId;

let accessToken;
let refreshToken;


document.addEventListener('DOMContentLoaded', init);

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

// Event object  
//====================================================================

document.getElementById('txt-event-title').addEventListener('change', (e) => {
    if (e.target.value) {
        eventObj.title = e.target.value;
    } else {
        delete eventObj.title;
    };
});

document.getElementById('date-event-start').addEventListener('change', (e) => {
    if (e.target.value) {
        eventObj.start = e.target.value;
    } else {
        delete eventObj.start;
    };
});

document.getElementById('date-event-end').addEventListener('change', (e) => {
    if (e.target.value) {
        eventObj.end = e.target.value;
    } else {
        delete eventObj.end;
    };
});

document.getElementById('select-whouse').addEventListener('change', (e) => {
    if (e.target.value) {
        eventObj.idWarehouse = e.target.value;
    } else {
        delete eventObj.idWarehouse;
    };
});

document.getElementById('txt-notes').addEventListener('change', (e) => {
    if (e.target.value) {
        eventObj.notes = e.target.value;
    } else {
        delete eventObj.notes;
    };
});

document.getElementById('select-event-city').addEventListener('change', (e) => {
    if (e.target.value) {
        eventObj.idEventCity = e.target.value;
    } else {
        delete eventObj.idEventCity;
    };
});

document.getElementById('select-event-place').addEventListener('change', (e) => {
    if (e.target.value) {
        eventObj.idEventPlace = e.target.value;
    } else {
        delete eventObj.idEventPlace;
    };
});

document.getElementById('select-event-client').addEventListener('change', (e) => {
    if (e.target.value) {
        eventObj.idClient = e.target.value;
    } else {
        delete eventObj.idClient;
    };
});

document.getElementById('select-manager-1').addEventListener('change', (e) => {
    if (e.target.value) {
        eventObj.idManager_1 = e.target.value;
    } else {
        delete eventObj.idManager_1;
    };
});

document.getElementById('select-manager-2').addEventListener('change', (e) => {
    if (e.target.value) {
        eventObj.idManager_2 = e.target.value;
    } else {
        delete eventObj.idManager_2;
    };
});

document.getElementById('select-status').addEventListener('change', (e) => {
    if (e.target.value) {
        eventObj.idStatus = e.target.value;
    } else {
        delete eventObj.idStatus;
    };
});


//          C R U D
//=====================================================================

//  CREATE Event 
//=====================================================================
document.getElementById('btn-event-create').addEventListener('click', createEvent);



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

    document.getElementById('txt-event-user').value = "testUser";

}

function loginUser() {
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
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })


}

function checkConnectionToMySQL() {

    console.log('Check connection to MySQL database');
    console.log('==========================================');
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

function getListWarehouses() {

    console.log("");
    console.log('Get list of warehouses');
    console.log('==========================================');
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


function getListLocations() {
    console.log("");
    console.log('Get list of locations');
    console.log('==========================================');
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

function getListClients() {
    console.log("");
    console.log('Get list of clients');
    console.log('==========================================');
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

function getListManagers() {
    console.log("");
    console.log('Get list of users');
    console.log('==========================================');
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
            loadSelectSource(data, selectManager_1);
            loadSelectSource(data, selectManager_2);
        })
        .then(getListStatus)
        .catch(error => {
            console.log("error:", error)
        })
}

function getListStatus() {
    console.log("");
    console.log('Get list of status');
    console.log('==========================================');
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
        // .then(getListStatus)
        .catch(error => {
            console.log("error:", error)
        })
}

//  Create data source input function 
//=====================================================================

function loadSelectSource(data, select) {
    select.innerHTML = "";
    let opt = document.createElement('option');
    opt.innerHTML = "";
    opt.value = 0;
    select.appendChild(opt);

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
                opt.innerHTML = data[i].firstName + " " + data[i].lastName;
                opt.value = data[i].id;
                break;
            case 'select-status':
                opt.innerHTML = data[i].status;
                opt.value = data[i].id;
                break;
        }

        select.appendChild(opt);

    }
}

//  CREATE Event function
//=====================================================================

function createEvent() {

    let start = document.getElementById('date-event-start').value;
    let end = document.getElementById('date-event-end').value;

    let startH = document.getElementById('select-time-start-h');
    let startM = document.getElementById('select-time-start-m');
    let endH = document.getElementById('select-time-end-h');
    let endM = document.getElementById('select-time-end-m');

    let hourStart = startH.options[startH.selectedIndex].value;
    let hourEnd = startM.options[startM.selectedIndex].value;
    let minStart = endH.options[endH.selectedIndex].value;
    let minEnd = endM.options[endM.selectedIndex].value;

    eventObj.start = start + "T" + hourStart + ":" + minStart + ":00";
    eventObj.end = end + "T" + hourEnd + ":" + minEnd + ":00";


    console.log("eventObj:", eventObj);

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