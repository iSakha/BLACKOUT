var CalendarList = [];
var schedulesList = [];
var selectedEvent = {};

document.addEventListener("DOMContentLoaded", getListDepartments);
let departmentListObj = {};
let categoryListObj = {};

getSchedulesList();




//          Q U E R I E S       to mid_server
// ====================================================================


//  Get List of events
// ------------------------------------------------------------------------
function getSchedulesList() {
    fetch('http://82.209.203.205:3080/events')
        .then(res => res.json())
        .then(data => {
            // filter out 'fake' events
            schedulesList = data.filter((e) => e.start != null);
            // console.log("schedulesList:", schedulesList);
            fillEventTable(schedulesList);
        })
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })

}

//  Get List Selected equipment for event
// ------------------------------------------------------------------------
function loadEventEquip(id) {
    let tbl = document.getElementById('equip-table');
    let tblBody = document.getElementById('equip-table-body');
    // console.log(id);
    // let data = {};
    // data.id = id;
    fetch('http://82.209.203.205:3080/equip/selected/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(data => {
            fillEquipEventTable(data, tbl, tblBody);
            eventEquipObj = data;
            console.log("Selected equipment:", data);
        })
        // .then(getSelectedEventEquip)
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

        loadEventEquip(selectedEventId);
        setDate(start, end);

    } else {
        // document.getElementById('div-booking-equip').classList.add("d-none");
        // document.getElementById('btn-add-equip').classList.add("d-none");
        // document.querySelectorAll('.row')[0].classList.add("d-none");
        // document.querySelectorAll('.row')[1].classList.add("d-none");
        // document.querySelectorAll('.row')[2].classList.add("d-none");

    }

});

//      Click button SUBMIT
// --------------------------------------------------------------------
document.getElementById('btn-submit').addEventListener('click', function (e) {
    e.preventDefault();
    let div = document.getElementById('div-dep-equip');
    div.classList.add('d-none');
    div = document.getElementById('div-cat-equip');
    div.classList.add('d-none');
    let select_cat = document.getElementById('cat');
    let cat = select_cat.options[select_cat.selectedIndex].value
    switch (cat) {
        case '000':
            let select_dep = document.getElementById('dep');
            let dep = select_dep.options[select_dep.selectedIndex].value
            getFullDepartmentEquipment(dep);
            break;
        default:
            getCategoryEquipment(cat);
            break;
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

//          FUNCTION Get Full equipment from Department
// --------------------------------------------------------------------

function getFullDepartmentEquipment(dep) {
    let data = {};
    data.id = dep;
    // fetch('http://127.0.0.1:3080/equip/dep/' + dep, {
    fetch('http://82.209.203.205:3080/equip/dep/' + dep, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        // body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            // categoryListObj = data;
            console.log("dep:", data);
            fillEquipTableByDep(data);
        })
        // .then(getListCategories)
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}

//          FUNCTION Fill Equip table by department
// --------------------------------------------------------------------
function fillEquipTableByDep(data) {

    if (data.length > 0) {
        let div = document.getElementById('div-dep-equip');
        let tbl_head = document.getElementById('dep-equip');
        let tbl = document.getElementById('tbl-equip-dep');
        div.classList.remove('d-none');
        let select_dep = document.getElementById('dep');
        let dep_val = select_dep.options[select_dep.selectedIndex].text;
        tbl_head.innerHTML = dep_val;
        let tblBody = document.getElementById('tbody-equip-dep');
        tblBody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {

            let row = document.createElement('tr');

            let cell = document.createElement("td");
            cell.innerHTML = i;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].model_name;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].qty;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].qty_minsk;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].qty_kazan;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].qty_msc;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].qty_piter;
            row.appendChild(cell);

            tblBody.appendChild(row)
        }
        tbl.append(tblBody)
    }

}

function getCategoryEquipment(cat) {
    let data = {};
    data.id = cat;
    // fetch('http://127.0.0.1:3080/equip/cat/' + cat, {
    fetch('http://82.209.203.205:3080/equip/cat/' + cat, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => {
            // categoryListObj = data;
            console.log("cat:", data);
            fillEquipTableByCat(data);
        })
        // .then(getListCategories)
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}

//          FUNCTION Fill Equip table by category
// --------------------------------------------------------------------
function fillEquipTableByCat(data) {
    if (data.length > 0) {
        let div = document.getElementById('div-cat-equip');
        let tbl_head = document.getElementById('cat-equip');
        let tbl = document.getElementById('tbl-equip-cat');
        div.classList.remove('d-none');
        let select_dep = document.getElementById('cat');
        let dep_val = select_dep.options[select_dep.selectedIndex].text;
        tbl_head.innerHTML = dep_val;
        let tblBody = document.getElementById('tbody-equip-cat');
        tblBody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {

            let row = document.createElement('tr');

            let cell = document.createElement("td");
            cell.innerHTML = i;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].model_name;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].qty;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].qty_minsk;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].qty_kazan;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].qty_msc;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].qty_piter;
            row.appendChild(cell);

            tblBody.appendChild(row)
        }
        tbl.append(tblBody)
    }
}

function fillEquipEventTable(equip, tbl, tblBody) {
    console.log("fillEquipEventTable", equip);
    tblBody.innerHTML = "";
    for (let i = 0; i < equip.length; i++) {

        // eventEquipArr.push(equip[i]);

        let row = document.createElement('tr');

        let cell = document.createElement("td");
        cell.innerHTML = i + 1;
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.innerHTML = equip[i].fixture;
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.innerHTML = equip[i].event_name;
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.innerHTML = equip[i].qty;
        row.appendChild(cell);

        tblBody.appendChild(row);
    }
    tbl.append(tblBody);

    document.getElementById('div-equip-table').classList.remove("d-none");

    // console.log('eventEquipArr :', eventEquipArr);
}