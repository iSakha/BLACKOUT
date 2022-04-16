"use strict";

document.addEventListener("DOMContentLoaded", getListDepartments);
let departmentListObj = {};
let categoryListObj = {};


//          Get List of Departments and Categories
// --------------------------------------------------------------------
function getListDepartments() {

    let input = document.getElementById('dep');
    fetch('http://127.0.0.1:3080/equip/dep', {
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
    fetch('http://127.0.0.1:3080/equip/cat', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
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

//*********************************************************************
//                  F U N C T I O N S                
//*********************************************************************

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

//          FUNCTION Get Full equipment from Department
// --------------------------------------------------------------------
function getFullDepartmentEquipment(dep) {
    let data = {};
    data.id = dep;
    fetch('http://127.0.0.1:3080/equip/dep', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
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

//          FUNCTION Get Full equipment from Category
// --------------------------------------------------------------------
function getCategoryEquipment(cat) {
    let data = {};
    data.id = cat;
    fetch('http://127.0.0.1:3080/equip/cat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
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

//      FUNCTION get list of fixture_types
// --------------------------------------------------------------------
function getListFixtureTypes(cat) {
    let input = document.getElementById('fxt-type');
    let data = {};
    data.id = cat;
    fetch('http://127.0.0.1:3080/equip/fxt', {
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