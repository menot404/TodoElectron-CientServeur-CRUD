const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");
const formRouter = require("./formRoute");
const taskRouter = require("./taskRoute");

// Route d'accueil
router.get("/", taskController.read);

router.use("/tasks", taskRouter);
router.use("/forms", formRouter);

module.exports = router;
