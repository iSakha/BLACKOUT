const express = require("express");
const PORT = 3088;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: false });

//      Get Home page
// ==========================================================
app.use(express.static(__dirname + "/public"));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });