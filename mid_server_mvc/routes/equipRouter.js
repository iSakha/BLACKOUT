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
equipRouter.get('/:dep_id/:cat_id', equipController.getEquipmentByDepAndCat);

//  READ Equipment by Department, Category and Fixture type
// --------------------------------------------------------------------
equipRouter.get('/:dep_id/:cat_id/:ftype_id', equipController.getEquipmentByDepCatFType);

//  WRITE transferring equipment to DB
// --------------------------------------------------------------------
// equipRouter.patch('/transfer', equipController.writeTransEquipment);

    //  UPDATE Equipment to the Event
// --------------------------------------------------------------------
// app.patch("/equip/transfer", urlencodedParser, function (request, response) {
//     if (!request.body) return response.sendStatus(400);
//     console.log("request.body", request.body);
//     // return updateEquipmentToEvent(request.body, response);
//     response.send(request.body);
//   });

module.exports = equipRouter;