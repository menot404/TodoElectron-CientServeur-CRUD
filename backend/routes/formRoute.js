const formController = require("../controller/formController");
const express = require("express");
const router = express.Router();

// CREATE - Afficher le formulaire d'ajout
router.get("/add", formController.affForm);

// UPDATE - Afficher le formulaire d'édition
router.get("/edit/:id", formController.affFormEdit);

module.exports = router;
