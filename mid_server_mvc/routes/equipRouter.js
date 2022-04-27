const express = require("express");
const equipController = require("../controllers/equipController.js");
const equipRouter = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  READ ALL Equipment
// --------------------------------------------------------------------
equipRouter.get('/', equipController.getEquipment);

//  READ ALL Departments
// --------------------------------------------------------------------
equipRouter.get('/dep', equipController.getDepartment);

//  READ ALL Categories
// --------------------------------------------------------------------
equipRouter.get('/cat', equipController.getCategories);

//  READ Categories by Department
// --------------------------------------------------------------------
equipRouter.get('/cat/:dep_id', equipController.getCategoriesByDep);

//  READ Equipment by Department
// --------------------------------------------------------------------
equipRouter.get('/:dep_id', equipController.getEquipmentByDep);

//  READ Equipment by Department and Category
// --------------------------------------------------------------------
equipRouter.get('/', equipController.getEquipmentByDepAndCat);


module.exports = equipRouter;