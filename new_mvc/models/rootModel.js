const dtb = require('../config/database');
const db = dtb.promise();

module.exports = class Root {

    // CLIENTS
    // =====================================================================

    static getClients() {
        return db.execute('SELECT * FROM `t_clients`');
    }

    // static getOneClient(id) {
    //     console.log("id:",id);
    //     return db.execute('SELECT * FROM `t_clients` WHERE `id`=?', [id]);
    // }

    static getOneClient(id) {
        try {
            console.log("id:",id);
            return db.execute('SELECT * FROM `t_clients` WHERE `id`=?', [id]);
        } catch (error) {
            return error;
        }
    }



    static addClient(clientRow) {
        return db.execute('INSERT INTO `t_clients` (client, clientDescription, comments) VALUES(?, ?, ?)', clientRow);
    }

    static updateClient(clientRow) {
        return db.execute('UPDATE `t_clients` SET client=?, clientDescription=?, comments=? WHERE id=?', clientRow);
    }






    static getLocations() {
        return db.execute('SELECT * FROM `v_location`');
    }







    static getUsers() {
        return db.execute('SELECT `id`, `login`, `firstName`, `lastName`, `fullName`, `avatar`, `role` FROM `v_users`');
    }

    static getUser(userID) {
        return db.execute('SELECT `id`, `login`, `firstName`, `lastName`, `fullName`, `avatar`, `role` FROM `v_users` WHERE `id` = ?',[userID]);
    }

    static getStatus() {
        return db.execute('SELECT * FROM `t_status`');
    }

    static addStatus() {
        return db.execute('INSERT INTO `t_status`(status) VALUES("new status")');
    }

    static getPhases() {
        return db.execute('SELECT * FROM `t_phase`');
    }

    static getWarehouses() {
        return db.execute('SELECT * FROM `t_warehouses`');
    }



// CREATE
// =====================================================================
static newCity() {
    return db.execute('INSERT * INTO `t_event_city` (city) VALUES(?)', [city]);
}

// UPDATE
// =====================================================================

// DELETE
// =====================================================================


}