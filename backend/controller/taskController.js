const Task = require("../model/taskModel");

// CONTROLLER

// READ - Afficher toutes les tâches
const read = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.render("views/pages/home", { tasks, title: "Accueil - TodoApp" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};

// CREATE - Ajouter une nouvelle tâche
const addNewtask = async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
    });
    await newTask.save();
    res.redirect("/app/v1/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la création");
  }
};

// UPDATE - Modifier une tâche
const upOneTask = async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed === "on",
    });
    res.redirect("/app/v1/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la modification");
  }
};

// DELETE - Supprimer une tâche
const delOneTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect("/app/v1/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la suppression");
  }
};

// UPDATE - Toggle completed status
const togglecompleted = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.redirect("/app/v1/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur");
  }
};

module.exports = {
  read,
  addNewtask,
  upOneTask,
  delOneTask,
  togglecompleted,
};
