const HOST = 'http://127.0.0.1';
// const HOST = 'http://82.209.203.205';
const PORT = 3070;
const URL = HOST + ':' + PORT;



document.getElementById('e-wh-getall').addEventListener('click',getListWarehouses);
document.getElementById('e-users-getall').addEventListener('click',getListUsers);
document.getElementById('e-clients-getall').addEventListener('click',getListClients);








//  GetListWarehouses function 
//=====================================================================
function getListWarehouses() {

    console.log(" ");
    console.log('==========================================');
    console.log('Get list of warehouses');
    console.log('GET http://127.0.0.1:3070/warehouses');

    let tbl = document.getElementById('')
    fetch(URL + '/warehouses', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log("warehouses:", data);
            createWarehouseTable(data);
        })
        .catch(error => {
            console.log("error:", error)
        })
}

//  Create Warehouse table function 
//=====================================================================
function createWarehouseTable(data) {
    console.log(" ");
    console.log('==========================================');
    console.log('createWarehouseTable');
    console.log("data for table: ", data);

    let tbl = document.getElementById('e-tbl-wh');
    let tblBody = document.getElementById('e-tbody-wh');
    tblBody.innerHTML = "";
    let row;
    let cell;

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {

            row = document.createElement('tr');

            cell = document.createElement("td");
            cell.innerHTML = data[i].id;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].warehouse;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].color;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].bgColor;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].address;
            row.appendChild(cell);

            tblBody.appendChild(row);

        }
        tbl.append(tblBody);
    }
}

//  Click Warehouse table
// ======================================================================
let tblBody = document.getElementById('e-tbody-wh');
tblBody.addEventListener('click', (e) => {
    // console.log(e.target);
    let td = e.target;
    let row = td.parentNode;
    let selectedWhouseId = row.children[0].innerHTML;


    console.log("selectedWhouseId:",selectedWhouseId);

    document.getElementById('txt-wh-id').value = row.children[0].innerHTML;
    document.getElementById('txt-wh').value = row.children[1].innerHTML;
    document.getElementById('txt-wh-color').value = row.children[2].innerHTML;
    document.getElementById('txt-wh-bgcolor').value = row.children[3].innerHTML;
    document.getElementById('txt-wh-address').value = row.children[4].innerHTML;

});

//********************************************************************/
//********************************************************************/

//  GetListUsers function 
//=====================================================================
function getListUsers() {

    console.log(" ");
    console.log('==========================================');
    console.log('Get list of users');
    console.log('GET http://127.0.0.1:3070/events/users');

    let tbl = document.getElementById('')
    fetch(URL + '/events/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log("users:", data);
            createUsersTable(data);
        })
        .catch(error => {
            console.log("error:", error)
        })
}

//  Create Users table function 
//=====================================================================
function createUsersTable(data) {
    console.log(" ");
    console.log('==========================================');
    console.log('createUsersTable');
    console.log("data for table: ", data);

    let tbl = document.getElementById('e-tbl-users');
    let tblBody = document.getElementById('e-tbody-users');
    tblBody.innerHTML = "";
    let row;
    let cell;

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {

            row = document.createElement('tr');

            cell = document.createElement("td");
            cell.innerHTML = data[i].id;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].login;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].pass;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].firstName;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].lastName;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].role;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].avatar;
            row.appendChild(cell);

            tblBody.appendChild(row);

        }
        tbl.append(tblBody);
    }
}

//  Click Users table
// ======================================================================
tblBody = document.getElementById('e-tbody-users');
tblBody.addEventListener('click', (e) => {
    // console.log(e.target);
    let td = e.target;
    let row = td.parentNode;
    let selectedWhouseId = row.children[0].innerHTML;


    console.log("selectedWhouseId:",selectedWhouseId);

    document.getElementById('txt-users-id').value = row.children[0].innerHTML;
    document.getElementById('txt-users-login').value = row.children[1].innerHTML;
    document.getElementById('txt-users-pass').value = row.children[2].innerHTML;
    document.getElementById('txt-users-fname').value = row.children[3].innerHTML;
    document.getElementById('txt-users-lname').value = row.children[4].innerHTML;
    document.getElementById('txt-users-role').value = row.children[5].innerHTML;
    document.getElementById('txt-users-avatar').value = row.children[6].innerHTML;

});

//********************************************************************/
//********************************************************************/

//  GetListClients function 
//=====================================================================
function getListClients() {

    console.log(" ");
    console.log('==========================================');
    console.log('Get list of clients');
    console.log('GET http://127.0.0.1:3070/events/clients');

    fetch(URL + '/events/clients', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log("clients:", data);
            createClientsTable(data);
        })
        .catch(error => {
            console.log("error:", error)
        })
}

//  Create Clients table function 
//=====================================================================
function createClientsTable(data) {
    console.log(" ");
    console.log('==========================================');
    console.log('createClientsTable');
    console.log("data for table: ", data);

    let tbl = document.getElementById('e-tbl-clients');
    let tblBody = document.getElementById('e-tbody-clients');
    tblBody.innerHTML = "";
    let row;
    let cell;

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {

            row = document.createElement('tr');

            cell = document.createElement("td");
            cell.innerHTML = data[i].id;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].client;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].clientDescription;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = data[i].comments;
            row.appendChild(cell);

            tblBody.appendChild(row);

        }
        tbl.append(tblBody);
    }
}

//  Click Users table
// ======================================================================
tblBody = document.getElementById('e-tbody-clients');
tblBody.addEventListener('click', (e) => {
    // console.log(e.target);
    let td = e.target;
    let row = td.parentNode;

    document.getElementById('txt-clients-id').value = row.children[0].innerHTML;
    document.getElementById('txt-clients').value = row.children[1].innerHTML;
    document.getElementById('txt-clients-descript').value = row.children[2].innerHTML;
    document.getElementById('txt-clients-comments').value = row.children[3].innerHTML;

});