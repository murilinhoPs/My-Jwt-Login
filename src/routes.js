const express = require("express");
const routes = express.Router();

const authMiddleware = require("./middlewares/auth");
const infoController = require("./controllers/infos_controller");
const sessionController = require("./controllers/session_controller");

// get all users
routes.get("/users", sessionController.getUsers);
// register users
routes.post("/users", sessionController.createUser);
// handle authentication
routes.post("/users/login", sessionController.authUser);

routes.use("/api", authMiddleware);

routes.get("/api/infos", infoController);

module.exports = routes;
