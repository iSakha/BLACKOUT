const HOST = 'http://127.0.0.1';
// const HOST = 'http://82.209.203.205';
const PORT = 3070;
const URL = HOST + ':' + PORT;

let eventLocations = {};
let events = {};
let selectedEventId;

document.addEventListener('DOMContentLoaded', init);

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
