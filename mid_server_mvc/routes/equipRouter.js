const express = require("express");
const equipController = require("../controllers/equipController.js");
const equipRouter = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  READ events
// --------------------------------------------------------------------
equipRouter.get('/', equipController.getEquipment);






module.exports = equipRouter;