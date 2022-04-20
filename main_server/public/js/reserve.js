var CalendarList = [];
var schedulesList = [];
var selectedEvent = {};

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
        // setDate(start, end);

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