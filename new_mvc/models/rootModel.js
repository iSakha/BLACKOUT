const dtb = require('../config/database');
const db = dtb.promise();

module.exports = class Root {

    // GET
    // =====================================================================

    static getLocations() {
        return db.execute('SELECT * FROM `v_location`');
    }

    static getClients() {
        return db.execute('SELECT * FROM `t_clients`');
    }

    static getUsers() {
        return db.execute('SELECT * FROM `v_users`');
    }

    static getStatus() {
        return db.execute('SELECT * FROM `t_status`');
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