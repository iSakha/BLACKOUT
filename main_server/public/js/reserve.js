var CalendarList = [];
var schedulesList = [];
var selectedEvent = {};

document.addEventListener("DOMContentLoaded", getListDepartments);
let departmentListObj = {};
let categoryListObj = {};

getSchedulesList();


function getSchedulesList() {

    // using fetch

    fetch('http://82.209.203.205:3080/events')
        .then(res => res.json())
        .then(data => {
            // enter you logic when the fetch is successful
            // var difficult_tasks = tasks.filter((task) => task.duration >= 120 );
            schedulesList = data.filter((e) => e.start != null );
            // schedulesList = data;
            console.log("schedulesList:", schedulesList);
            fillEventTable(schedulesList);
        })
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })

}

let tbl = document.getElementById('events-table');

//  Click Event table
// ======================================================================
tbl.addEventListener('click', (e) => {
    // console.log(e.target);
    let td = e.target;
    let row = td.parentNode;
    selectedEventId = row.children[0].innerHTML;
    let start = row.children[3].innerHTML;
    let end = row.children[4].innerHTML;
    selectedEquipAdd = [];
    selectedEquipUpd = [];
    clearBackgroundColor(tbl);
    // showAddButton();

    // document.getElementById('event-name').innerHTML = row.children[2].innerHTML;
    // document.getElementById('event-id').innerHTML = selectedEventId;

    // document.querySelectorAll('.row')[0].classList.remove("d-none");

    if (row.rowIndex > 0) {
        row.className = "yellow";

        // loadEventEquip(selectedEventId);
        setDate(start, end);

    } else {
        // document.getElementById('div-booking-equip').classList.add("d-none");
        // document.getElementById('btn-add-equip').classList.add("d-none");
        // document.querySelectorAll('.row')[0].classList.add("d-none");
        // document.querySelectorAll('.row')[1].classList.add("d-none");
        // document.querySelectorAll('.row')[2].classList.add("d-none");

    }

});


function fillEventTable(events) {

    let tbl = document.getElementById('events-table');
    let tblBody = document.getElementById('events-table-body');
    tblBody.innerHTML = "";

    console.log('events:', events);

    for (let i = 0; i < events.length; i++) {

        let row = document.createElement('tr');

        let cell = document.createElement("td");
        cell.innerHTML = events[i].id;
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.innerHTML = events[i].cal_name;
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.innerHTML = events[i].title;
        row.appendChild(cell);

        cell = document.createElement("td");
        let eventStartDate = events[i].start.slice(0, 10);
        cell.innerHTML = eventStartDate;
        row.appendChild(cell);

        cell = document.createElement("td");
        let eventEndDate = events[i].end.slice(0, 10);
        cell.innerHTML = eventEndDate;
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.innerHTML = events[i].notes;
        row.appendChild(cell);

        tblBody.appendChild(row)
    }
    tbl.append(tblBody)
}

function clearBackgroundColor(tbl) {
    let rows = tbl.rows;
    // console.log(rows.length);
    for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove("yellow");
    }
}

function getListDepartments() {

    let input = document.getElementById('dep');
    // fetch('http://127.0.0.1:3080/equip/dep', {
        fetch('http://82.209.203.205:3080/equip/dep', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(data => {
            departmentListObj = data;
            // console.log("departmentListObj:", departmentListObj);
            fillSelectInput(departmentListObj, input);
        })
        .then(getListCategories)
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}

function getListCategories() {

    let input = document.getElementById('cat');
    // fetch('http://127.0.0.1:3080/equip/cat', {
        fetch('http://82.209.203.205:3080/equip/cat', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => {
            categoryListObj = data;
            console.log("data:", data);
            fillSelectInput(categoryListObj, input);
        })
        // .then(getListCategories)
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}

//          Dependent Drop down lists
// ====================================================================

//      Select Department
// --------------------------------------------------------------------
document.getElementById('dep').addEventListener('change', changeCategorySelectSource);

function changeCategorySelectSource() {
    let dep = document.getElementById('dep').value;
    let opt = document.createElement('option');
    console.log("dep: ", dep)
    let input = document.getElementById('cat');
    switch (dep) {
        case '000':
            fillSelectInput(categoryListObj, input);
            break;
        default:
            input.innerHTML = "";
            let opt = document.createElement('option');
            input.innerHTML = "";
            opt.innerHTML = "Все";
            opt.value = "000";
            input.appendChild(opt);
            for (let i = 0; i < categoryListObj.length; i++) {
                opt = document.createElement('option');
                let str = categoryListObj[i].id;
                if (str.substring(0, 3) === dep) {
                    opt.innerHTML = categoryListObj[i].name;
                    opt.value = categoryListObj[i].id;
                    input.appendChild(opt);
                }
            }
            break;
    }
}

//      Select Category
// --------------------------------------------------------------------
document.getElementById('cat').addEventListener('change', setDepartmentSelectValue);

function setDepartmentSelectValue() {
    let cat = document.getElementById('cat').value;
    let dep = cat.substring(0, 3);
    console.log("cat:", cat);
    document.getElementById('dep').value = dep;
    getListFixtureTypes(cat);

}

//          FUNCTION Fill select input
// --------------------------------------------------------------------
function fillSelectInput(obj, input, f_type) {

    console.log("obj :", obj);

    let opt = document.createElement('option');
    input.innerHTML = "";
    opt.innerHTML = "Все";
    opt.value = "000";
    input.appendChild(opt);
    for (let i = 0; i < obj.length; i++) {
        opt = document.createElement('option');
        if (f_type) {
            opt.innerHTML = obj[i].model_name;
            opt.value = obj[i].fixture_type;
            input.appendChild(opt);
        } else {

            opt.innerHTML = obj[i].name;
            opt.value = obj[i].id;
            input.appendChild(opt);
        }

    }
}

//      FUNCTION get list of fixture_types
// --------------------------------------------------------------------
function getListFixtureTypes(cat) {
    let input = document.getElementById('fxt-type');
    let data = {};
    data.id = cat;
    fetch('http://82.209.203.205:3080/equip/fxt', {
    // fetch('http://127.0.0.1:3080/equip/fxt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            // categoryListObj = data;
            // console.log("data:", data);
            fillSelectInput(data, input, true);
        })
        // .then(getListCategories)
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}

function setDate(start, end) {
    document.getElementById('start').value = start;
    document.getElementById('end').value = end;
}