const dtb = require('../config/database');
const db = dtb.promise();

module.exports = class Root {

    // CLIENTS
    // =====================================================================

    static getClients() {
        try {
            return db.execute('SELECT * FROM `t_clients`');
        } catch (error) {
            return error;
        }
    }

    static getOneClient(id) {
        try {
            return db.query('SELECT * FROM `t_clients` WHERE `id`=?', [id]);
        } catch (error) {
            return error;
        }
    }

    static addClient(clientRow) {
        try {
            return db.execute('INSERT INTO `t_clients` (client, clientDescription, comments) VALUES(?, ?, ?)', clientRow);
        } catch (error) {
            return error;
        }
    }

    static updateClient(clientRow) {
        try {
            return db.execute('UPDATE `t_clients` SET client=?, clientDescription=?, comments=? WHERE id=?', clientRow);
        } catch (error) {
            return error;
        }
    }

    static deleteClient(id) {
        try {
            return db.query('DELETE FROM `t_clients` WHERE `id`=?', [id]);
        } catch (error) {
            return error;
        }
    }




// LOCATIONS
// =====================================================================

    static getLocations() {
        return db.execute('SELECT * FROM `v_location`');
    }

    static getCities() {
        return db.execute('SELECT * FROM `t_event_city`');
    }

    static getPlacesByCityId(id) {
        return db.execute('SELECT * FROM `v_location` WHERE idCity=?', [id]);
    }

    static addCity(city) {
        return db.execute('INSERT INTO `t_event_city` (`city`) VALUES (?)', [city]);
    }

    static addLocation(idCity, place) {
        console.log("addLocation_mod:", idCity, place);
        return db.execute('INSERT INTO `t_event_place` (`idEventCity`, `place`) VALUES (?, ?)', [idCity, place]);
    }





    static getUsers() {
        return db.execute('SELECT `id`, `login`, `firstName`, `lastName`, `fullName`, `avatar`, `role` FROM `v_users`');
    }

    static getUser(userID) {
        return db.execute('SELECT `id`, `login`, `firstName`, `lastName`, `fullName`, `avatar`, `role` FROM `v_users` WHERE `id` = ?', [userID]);
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