const Test = require('../models/testModel');


exports.test_1 = async (req, res) => {
    let msg = Test.test_1();
    res.status(200).json({ result: msg });
}


//      Destructuring
// ==================================================================
exports.test_2 = async (req, res) => {
    let msg = Test.test_1();

    let body = req.body;

    let { id, time: { start }, time: { end }, warehouse: { id: whId }, title, creator: { id: creatorId }, client: { id: clientId }, status: { id: statusId }, location: { city: { id: cityId }, place: { id: placeId } }, manager: { id: managerId }, notes } = body;

    let eventRow = [];

    let userId = 3;

    let unixTime = Date.now();

    eventRow.push(id);
    eventRow.push(whId);
    eventRow.push(title);
    eventRow.push(start.slice(0, 16));
    eventRow.push(end.slice(0, 16));
    eventRow.push(managerId);
    eventRow.push(cityId);
    eventRow.push(placeId);
    eventRow.push(clientId);
    eventRow.push(creatorId);
    eventRow.push(notes);
    eventRow.push(statusId);
    eventRow.push(userId);
    eventRow.push(unixTime);

    console.log("req.body:", body);
    console.log("eventRow:", eventRow);

    try {
        const [newEvent] = await Test.createEvent(eventRow);
        console.log("result newEvent:", newEvent);

    } catch (error) {
        console.log("error:", error);
        res.status(500).json({ msg: "We have problems with writing event data to database" });
        return {
            error: true,
            message: 'Error from database'
        }
    }

    let phaseArr = [];
    if (req.body.phase.length > 0) {

        req.body.phase.map(item => {
            let phaseRow = [];
            let { id, start, end } = item;

            console.log("req.body.phase:", req.body.phase);
            // eventId
            phaseRow.push(eventRow[0]);
            phaseRow.push(id);
            phaseRow.push(start.slice(0, 16));
            phaseRow.push(end.slice(0, 16));
            phaseRow.push(userId);
            phaseRow.push(unixTime);

            phaseArr.push(phaseRow);
        })

        console.log("phaseArr:", phaseArr);

        try {
            const [newPhase] = await Test.createPhase(phaseArr);
            console.log("result newPhase:", newPhase);

        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with writing phase data to database" });
            return {
                error: true,
                message: 'Error from database'
            }
        }

    }

    let bookArr = [];
    if (req.body.booking.length > 0) {

        req.body.booking.map(item => {
            let bookRow = [];
            let { id, qtt } = item;

            console.log("req.body.booking:", req.body.booking);

            bookRow.push(eventRow[0]);      // eventId
            bookRow.push(id + ".0000");
            bookRow.push(qtt);
            bookRow.push(eventRow[1]);      // whId
            bookRow.push(userId);
            bookRow.push(unixTime);

            bookArr.push(bookRow);
        })

        console.log("bookArr:", bookArr);

        try {
            const [newBook] = await Test.createBook(bookArr);
            console.log("result newBook:", newBook);

        } catch (error) {
            console.log("error:", error);
            res.status(500).json({ msg: "We have problems with writing booking data to database" });
            return {
                error: true,
                message: 'Error from database'
            }
        }

    }

    res.status(200).json({ result: msg });
}


//      Constructor
// ==================================================================
exports.test_3 = async (req, res) => {

    // let event =   [{
    //     idEvent: '166-test-40',
    //     idWarehouse: 2,
    //     warehouse: 'Минск',
    //     title: 'Би-3',
    //     idCreatedBy: 3,
    //     createdBy: 'Алексей Гаптар',
    //     idClient: 4,
    //     client: 'Пожарное депо №3 upd',
    //     start: "2022-06-14T15:00:00.000Z",
    //     end: "2022-06-18T15:00:00.000Z",
    //     idStatus: 4,
    //     status: 'Отменен',
    //     idEventCity: 5,
    //     eventCity: 'Питер',
    //     idEventPlace: 4,
    //     eventPlace: 'Беларусьфильм',
    //     notes: 'Тест заметки',
    //     idManager_1: 3,
    //     manager_1: 'Алексей Гаптар',
    //     updatedAt: "2022-08-13T12:21:30.000Z",
    //     idUpdatedBy: 3,
    //     updatedBy: 'Алексей Гаптар',
    //     idPhase: 1,
    //     unixTime: 1660393291129
    //   }]

    try {

        console.log("req.params.id:", req.params.id);

        const [event] = await Test.getOne(req.params.id);
        console.log("event:", event);
        if (event.length < 1) {
            res.status(200).json({ msg: `Мероприятия с id = ${req.params.id} не существует` });
            return;
        } else {
            // console.log("event:", event[0]);
            let eventObj = new Test(req.params.id, event[0]);
            res.status(200).json(eventObj);
            // res.status(200).json({ result: "ok" });
            return;
        }
    } catch (error) {
        console.log("error:", error);
        res.status(500).json({ msg: "We have problems with getting event from database" });
        return {
            error: true,
            message: 'Error from database'
        }
    }


}