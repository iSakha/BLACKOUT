module.exports = class Event {

    constructor(oEvent) {
        this.id = oEvent.id;
        this.title = oEvent.title;
        this.time = oEvent.time;
        this.warehouse = oEvent.warehouse;
        this.creator = { id: 1 };
        this.client = { id: 1 };
        this.status = { id: 1 };
        this.location = {
            city: { id: 1 },
            place: { id: 1 }
        }
        this.manager = { id: 1 };
        this.phase = null;
        this.notes = "test notes";
    }

}