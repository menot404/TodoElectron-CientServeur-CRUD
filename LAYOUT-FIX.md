# 🎯 Layout dynamique avec Header & Footer

Tu disposes d’un système de layout complet et dynamique :

- index.ejs = template principal (wrapper)
- header.ejs = navigation incluse automatiquement
- footer.ejs = pied de page inclus automatiquement
- pages (home.ejs, add.ejs, edit.ejs) = contenu dynamique

## 🏗️ Structure

Voir README.md pour la structure complète.

## 🔧 Modifications principales

- Installation de express-ejs-layouts
- Configuration du layout dans server.js
- Actualisation de index.ejs (partials, body, CSS)
- Mise à jour des controllers pour utiliser les bons chemins

## 🚀 Fonctionnement

Le layout index.ejs sert de wrapper à toutes les pages. Les partials header/footer sont inclus automatiquement. Le contenu dynamique est injecté dans `<main><%- body %></main>`.

## 💡 Avantages

- DRY : header/footer définis une seule fois
- Dynamique : titre et contenu changent selon la page
- Maintenable : modification du header/footer = partout
- Flexible : possibilité d’utiliser différents layouts

## 🧪 Test

1. Redémarre le serveur : `npm run dev`
2. Visite : http://localhost:3000/app/v1/
3. Vérifie l’affichage du header, des tâches, du footer
4. Clique sur "Nouvelle tâche" et vérifie le titre

## 📦 package.json

Vérifie la présence de :

- ejs
- express
- express-ejs-layouts
- mongoose

## 🎉 Conclusion

Ton app utilise maintenant un layout professionnel, maintenable et scalable !
