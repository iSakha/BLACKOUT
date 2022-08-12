const dtb = require('../config/database');
const db = dtb.promise();

module.exports = class Test {

    static test_1() {
        return "OK"
    }

}