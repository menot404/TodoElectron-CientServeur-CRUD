// Middleware de gestion des erreurs
const errorHandler = (err, req, res, next) => {
  console.error("❌ Erreur:", err.message);

  const status = err.status || 500;
  const message = err.message || "Erreur serveur interne";

  res.status(status).render("views/error", {
    status,
    message,
    error: process.env.NODE_ENV === "production" ? {} : err,
  });
};

module.exports = errorHandler;
