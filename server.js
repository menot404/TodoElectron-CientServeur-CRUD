const express = require("express");
const connecDB = require("./backend/data/dbConfig");
const routes = require("./backend/routes/indexRoute");
const path = require("path");
const errorHandler = require("./backend/middleware/errorHandler");
const expressLayouts = require("express-ejs-layouts");

const PORT = process.env.PORT || 3000;
const localhost = "http://localhost:";
const app = express();

// Configuration middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend/src"));
app.set("layout", "index");
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend/public")));

// Routes
app.use("/app/v1", routes);

// 404 - Page non trouvée
app.use((req, res) => {
  res
    .status(404)
    .render("views/404", { url: req.originalUrl, title: "Page Non Trouvée" });
});

// Middleware d'erreurs (doit être le dernier)
app.use(errorHandler);

// Démarrage du serveur
connecDB
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur ${localhost}${PORT}`);
      console.log(`📝 Accédez à l'app: ${localhost}${PORT}/app/v1/`);
    });
  })
  .catch((err) => {
    console.error(`❌ Erreur MongoDB: ${err}`);
    process.exit(1);
  });
