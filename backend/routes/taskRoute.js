const taskController = require("../controller/taskController");
const express = require("express");
const router = express.Router();

// CREATE - Ajouter une nouvelle tâche
router.post("/", taskController.addNewtask);

// UPDATE - Modifier une tâche
router.post("/:id", taskController.upOneTask);

// DELETE - Supprimer une tâche
router.post("/:id/delete", taskController.delOneTask);

// UPDATE - Toggle completed status
router.post("/:id/toggle", taskController.togglecompleted);

module.exports = router;
