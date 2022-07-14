const express = require("express");
const PORT = 3088;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: false });

//      Get Home page (Calendar)
// ==========================================================
app.use(express.static(__dirname + "/public"));


//      Get Equipment page
// ==========================================================
app.get("/equip", function (request, response) {
  response.sendFile(__dirname + "/public/equip.html");
});



//      Get Reservation page
// ==========================================================
app.get("/reserve", function (request, response) {
  response.sendFile(__dirname + "/public/reserve.html");
});





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });