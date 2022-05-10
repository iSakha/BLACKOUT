const express = require("express");
const eventController = require("../controllers/eventController.js");
const eventRouter = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//  READ events
// --------------------------------------------------------------------
eventRouter.get('/', eventController.getEvents);

//  CREATE event
// --------------------------------------------------------------------
eventRouter.post('/', eventController.createNewEvent);

//  DELETE event
// --------------------------------------------------------------------
eventRouter.delete('/:id',eventController.deleteEvent);

//  UPDATE event
// --------------------------------------------------------------------
eventRouter.put('/:id', eventController.updateEvent);

//  READ events SUMMARY
// --------------------------------------------------------------------
eventRouter.get('/summary', eventController.getEventsSummary);

// GET event by ID
eventRouter.get('/id/:id',eventController.getEventByID);

//  Get event status for drop down menu
// --------------------------------------------------------------------
eventRouter.get('/status/getstatus', eventController.getEventsStatus);

//  Get event phase for drop down menu
// --------------------------------------------------------------------
eventRouter.get('/phase/getphase', eventController.getEventsPhase);




module.exports = eventRouter;