const Test = require('../models/testModel');


exports.test_1 = async (req, res) => {
    let msg = Test.test_1();
    res.status(200).json({ result: msg });
}