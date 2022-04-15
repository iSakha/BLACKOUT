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

function fillSelectInput(obj, input) {
    let opt = document.createElement('option');
    input.innerHTML = "";
    // console.log("departmentList:", obj);
    // console.log("qty:", obj.length);
    opt.innerHTML = "Все";
    opt.value = "000";
    input.appendChild(opt);
    for (let i = 0; i < obj.length; i++) {
        opt = document.createElement('option');
        opt.innerHTML = obj[i].name;
        opt.value = obj[i].id;
        input.appendChild(opt);
    }
}

//          Dependent Drop down lists
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
document.getElementById('cat').addEventListener('change', setDepartmentSelectValue);

function setDepartmentSelectValue() {
    let cat = document.getElementById('cat').value;
    let dep = cat.substring(0,3);
    console.log(cat);
    document.getElementById('dep').value = dep;
    getListFixtureTypes(cat);

}

function getListFixtureTypes(cat) {
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
            categoryListObj = data;
            console.log("data:", data);
            // fillSelectInput(categoryListObj, input);
        })
        // .then(getListCategories)
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}