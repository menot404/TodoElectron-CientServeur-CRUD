pages/home.ejs
│
pages/add.ejs
│
pages/edit.ejs
│
je dois la rendre avec index.ejs comme wrapper!"

# 🎯 Layout dynamique - Explication visuelle

Avant : header/footer dupliqués dans chaque page EJS.
Après : layout centralisé (index.ejs) qui inclut automatiquement header/footer et injecte le contenu dynamique.

## Exemple simplifié

**Avant**

```ejs
<%- include('../partials/header') %>
<div class="container">...</div>
<%- include('../partials/footer') %>
```

**Après**

```ejs
<div class="container">...</div>
<!-- Le layout gère header/footer -->
```

## Flux de rendu

1. Route Express → Controller → res.render('views/pages/home', { tasks })
2. express-ejs-layouts applique index.ejs comme layout
3. Le contenu dynamique est injecté dans `<main><%- body %></main>`
4. Le navigateur reçoit le HTML complet avec header/footer

## Avantages

- DRY : header/footer une seule fois
- Maintenance facilitée
- Ajout de pages simplifié
- Architecture MVC claire

## Concepts clés

- Layout EJS
- express-ejs-layouts
- MVC
- Séparation des responsabilités

**Ton app utilise maintenant un layout professionnel ! 🚀**
