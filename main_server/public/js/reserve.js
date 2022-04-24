let CalendarList = [];
let schedulesList = [];
let selectedEvent = {};
let eventEquipArr = [];
let selectedEquipAdd = [];
let selectedEquipUpd = [];

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
        .then(getSelectedEventEquip)
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

//  Click Equipment table
// ======================================================================
let tblEquip = document.getElementById('booking-equip-table');
tblEquip.addEventListener('click', (e) => {

    // console.log(e.target.className);
    if (e.target.className == "txt-to-take") {

        let td = e.target.parentNode;
        let tr = td.parentNode;
        let txt = e.target;
        let old_value = txt.value;
        let new_value;
        let fxt_id = tr.children[0].innerHTML;
        let maxQty = parseInt(tr.children[3].innerHTML);
        console.log(fxt_id);
        console.log('old_value', old_value);
        if (!txt.disabled) {
            txt.value = "";
        }

        e.target.addEventListener('keydown', (e) => {
            if (e.keyCode == 13) {
                txt.blur();
            }
        })

        e.target.addEventListener('focusout', () => {
            new_value = txt.value;
            if (new_value > maxQty) {
                alert("Сколько-сколько?");
                txt.value = old_value;
                return;
            }
            if (new_value == "") {
                txt.value = old_value;
                new_value = txt.value;
            }
            if (old_value !== new_value) {
                tr.classList.add('pink');
                let fixtObj = {};
                fixtObj.id_fxt = fxt_id;
                fixtObj.id_event = selectedEventId
                fixtObj.qty = new_value;
                txt.disabled = true;
                if (old_value > 0) {
                    selectedEquipUpd.push(fixtObj);
                    console.log(selectedEquipUpd);
                } else {
                    selectedEquipAdd.push(fixtObj);
                    console.log(selectedEquipAdd);
                }
            }

        })
    } else if (e.target.className == "equip-tbl-cell") {
        let td = e.target;
        let row = td.parentNode;
        let selectedFixture = row.children[0].innerHTML;
        console.log(selectedFixture);

        // document.getElementById('lbl-fxtName').innerHTML = row.children[1].innerHTML;
        // document.getElementById('lbl-storage-qty').innerHTML = row.children[3].innerHTML;
        // document.getElementById('lbl-available-qty').innerHTML = row.children[4].innerHTML;
        // document.getElementById('lbl-fxt-id').innerHTML = row.children[0].innerHTML;

        // document.querySelectorAll('.row')[1].classList.remove("d-none");
        // document.querySelectorAll('.row')[2].classList.remove("d-none");

    }

})

//  Click Button "Save to db" (UPDATE data)
// ======================================================================
document.getElementById('btn-save-db').addEventListener('click', () => {

    console.log("selectedEquipAdd:", selectedEquipAdd);
    console.log("selectedEquipUpd:", selectedEquipUpd);

    // let u_selectedEquipAdd = Array.from(new Set(selectedEquipAdd));
    // let u_selectedEquipUpd = Array.from(new Set(selectedEquipUpd));

    // console.log("u_selectedEquipAdd:", u_selectedEquipAdd);
    // console.log("u_selectedEquipUpd:", u_selectedEquipUpd);

    switch (selectedEquipUpd.length) {
        case 0:
            switch (selectedEquipAdd.length) {
                case 0:
                    break;
                default:
                    console.log("addSelectedEquipToDB");
                    addSelectedEquipToDB();
                    break;
            }
            break;
        default: switch (selectedEquipAdd.length) {
            case 0:
                console.log("updateSelectedEquipToDB");
                updateSelectedEquipToDB();
                break;
            default:
                console.log("addThenUpdateSelectedEquipToDB");
                addThenUpdateSelectedEquipToDB();
                break;
        }
            break;
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
    eventEquipArr = equip;
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
        cell.innerHTML = equip[i].selected_qty;
        row.appendChild(cell);

        tblBody.appendChild(row);
    }
    tbl.append(tblBody);

    document.getElementById('div-equip-table').classList.remove("d-none");

    // console.log('eventEquipArr :', eventEquipArr);
}

function getSelectedEventEquip() {

    document.getElementById('div-booking-equip').classList.remove("d-none");
    let start = document.getElementById('start').value;
    let end = document.getElementById('end').value;
    loadEquipment(start, end);

}

function loadEquipment(start, end) {
    let tbl = document.getElementById('booking-equip-table');
    let tblBody = document.getElementById('booking-equip-table-body');
    interval = {};
    interval.start = start;
    interval.end = end;

    // console.log("interval:", interval);

    let data = JSON.stringify(interval);
    fetch('http://82.209.203.205:3080/equipment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    })
        .then(res => res.json())
        .then(data => {
            // console.log("equipment using date:", data);
            fillEquipTable(data, tbl, tblBody)
        })
        // .then(refresh)
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}

function fillEquipTable(equip, tbl, tblBody) {
    console.log("fillEquipTable", equip);

    tblBody.innerHTML = "";
    for (let i = 0; i < equip.length; i++) {

        let row = document.createElement('tr');
        let cell = document.createElement("td");

        if (equip[i].fixture_type_id.slice(8, 11) === '000') {
            cell.innerHTML = "";
        } else cell.innerHTML = equip[i].fixture_type_id;
        row.appendChild(cell);

        cell = document.createElement("td");
        if (equip[i].fixture_type_id.slice(8, 11) === '000') {
            cell.classList.add('font-bold');
        }
        cell.innerHTML = equip[i].fixture;
        row.appendChild(cell);

        cell = document.createElement("td");
        if (equip[i].fixture_type_id.slice(8, 11) === '000') {
            cell.innerHTML = "";
        } else cell.innerHTML = equip[i].storage_qty;
        row.appendChild(cell);

        cell = document.createElement("td");
        if (equip[i].fixture_type_id.slice(8, 11) === '000') {
            cell.innerHTML = "";
        } else cell.innerHTML = equip[i].result_qty;
        row.appendChild(cell);


        cell = document.createElement("td");
        if (equip[i].fixture_type_id.slice(8, 11) === '000') {
            cell.innerHTML = "";
        } else cell.innerHTML = equip[i].selected_qty;
        row.appendChild(cell);

        cell = document.createElement("td");
        if (equip[i].fixture_type_id.slice(8, 11) === '000') {
            cell.innerHTML = "";
        } else {
            cell.classList.add('equip-tbl-cell');
            let newinputbox = document.createElement("input");
            newinputbox.classList.add('txt-to-take')
            newinputbox.value = getEventEquip(equip[i].fixture_type_id);
            newinputbox.setAttribute("type", "text");
            if (newinputbox.value > 0) {
                row.classList.add("yellow");
            }

            cell.appendChild(newinputbox);
        }

        row.appendChild(cell);

        tblBody.appendChild(row);
    }
    tbl.append(tblBody);

    document.getElementById('div-equip-table').classList.remove("d-none");
}

function getEventEquip(id) {
    // console.log(id);
    let qty = 0;
    for (let i = 0; i < eventEquipArr.length; i++) {
        if (eventEquipArr[i].fixture_type_id === id) {
            // console.log(eventEquipArr[i].selected_qty);
            qty = eventEquipArr[i].selected_qty;
        }
    }
    return qty;
}

//  Query functions (ADD, UPDATE, ADD then UPDATE)
// --------------------------------------------------------------------
function addSelectedEquipToDB() {
    console.log("addSelectedEquipToDB");

    fetch('http://82.209.203.205:3080/equipment/event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedEquipAdd)
    })
        .then(res => res.json())
        .then(data => {
            // fillEquipTable(data, tbl, tblBody)
            console.log("data:", data);
            // alert('Добавлено успешно');
        })
        .then(loadEventEquip(selectedEventId))
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}

function updateSelectedEquipToDB() {
    fetch('http://82.209.203.205:3080/equipment/event', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedEquipUpd)
    })
        .then(res => res.json())
        .then(data => {
            // fillEquipTable(data, tbl, tblBody)
            console.log("data:", data);
            // alert('Добавлено успешно');
        })
        .then(loadEventEquip(selectedEventId))
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}

function addThenUpdateSelectedEquipToDB() {
    fetch('http://82.209.203.205:3080/equipment/event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedEquipAdd)
    })
        .then(res => res.json())
        .then(data => {
            // fillEquipTable(data, tbl, tblBody)
            console.log("data:", data);
            // alert('Добавлено успешно');
        })
        .then(updateSelectedEquipToDB)
        .then(loadEventEquip(selectedEventId))
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}