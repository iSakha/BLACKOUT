const express = require("express");
const eventController = require("../controllers/eventController.js");
const eventRouter = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const urlencodedParser = express.urlencoded({ extended: false });

//  READ events
// --------------------------------------------------------------------
eventRouter.get('/', eventController.getEvents);

//  CREATE event
// --------------------------------------------------------------------
// eventRouter.post("/create",urlencodedParser, eventController.addEvent(request.body, response));
eventRouter.post('/', eventController.createNewEvent);

module.exports = eventRouter;