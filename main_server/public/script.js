"use strict";

document.getElementById('btn-test').addEventListener('click', loadEquipment);

function loadEquipment() {

    fetch('http://127.0.0.1:3080/equipment', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
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