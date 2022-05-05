const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  CHECK credentials
// --------------------------------------------------------------------
userRouter.post('/', userController.checkCredentials);


module.exports = userRouter;