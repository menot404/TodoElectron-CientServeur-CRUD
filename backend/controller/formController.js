// CONTROLLER - FORM
const Task = require("../model/taskModel");

// CREATE - Afficher le formulaire d'ajout
const affForm = (req, res) => {
  res.render("views/pages/add", { title: "Nouvelle Tâche - TodoApp" });
};

// UPDATE - Afficher le formulaire d'édition
const affFormEdit = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Tâche non trouvée");
    }
    res.render("views/pages/edit", { task, title: "Modifier Tâche - TodoApp" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Tâche non trouvée");
  }
};

module.exports = {
  affForm,
  affFormEdit,
};
