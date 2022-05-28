function currentDateTime() {

    let oDate = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + oDate.getDate()).slice(-2);

    // current month
    let month = ("0" + (oDate.getMonth() + 1)).slice(-2);

    // current year
    let year = oDate.getFullYear();

    // current hours
    let hours = ("0" + oDate.getHours()).slice(-2);

    // current minutes
    let minutes = ("0" + oDate.getMinutes()).slice(-2);

    // current seconds
    let seconds = oDate.getSeconds();

    // prints date in YYYY-MM-DD format
    console.log(year + "-" + month + "-" + date);

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    // console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    console.log(year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds);

    let now = year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds;

    // prints time in HH:MM format
    console.log(hours + ":" + minutes);

    console.log("now:", now);

    return now;

}

function createEventId() {
    let d = new Date();
    let utc = d.getTime().toString();
    let id = utc.slice(0,11);
    return id;
}

module.exports = {
    currentDateTime: currentDateTime,
    createEventId: createEventId
};