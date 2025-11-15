# 🎯 LAYOUT DYNAMIQUE - EXPLICATION VISUELLE

## ✨ Avant vs Après

### ❌ AVANT (Pas optimal - Code répété)

```
pages/home.ejs
│
├── <%- include('../partials/header') %>
├── <div class="container">
│   └── // Contenu unique
├── <%- include('../partials/footer') %>
└── [Header et footer répétés dans CHAQUE page]

pages/add.ejs
│
├── <%- include('../partials/header') %>
├── <form>
│   └── // Contenu unique
├── <%- include('../partials/footer') %>
└── [Code dupliqué]

pages/edit.ejs
│
├── <%- include('../partials/header') %>
├── <form>
│   └── // Contenu unique
├── <%- include('../partials/footer') %>
└── [Code dupliqué]
```

**Problème**: Header et footer dupliqués dans chaque fichier!

---

### ✅ APRÈS (Optimal - Layout centralisé)

```
index.ejs (LAYOUT PRINCIPAL)
│
├── <!DOCTYPE html>
├── <head>...</head>
├── <body>
│   ├── <%- include('./views/partials/header') %>
│   ├── <main>
│   │   └── <%- body %>  ← Le contenu dynamique va ICI
│   └── <%- include('./views/partials/footer') %>
└── </body>
```

**Avantage**: Header et footer définis UNE SEULE FOIS!

---

## 🔄 Flux de Rendu

### Étape 1: L'utilisateur visite la page

```
Utilisateur clique sur: http://localhost:3000/app/v1/
```

### Étape 2: Express route vers le controller

```javascript
// backend/routes/indexRoute.js
router.get("/", taskController.read);
```

### Étape 3: Le controller prépare les données

```javascript
// backend/controller/taskController.js
const read = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });

  // Appelle le rendu avec les données
  res.render("views/pages/home", {
    tasks, // Données
    title: "Accueil - TodoApp", // Titre personnalisé
  });
};
```

### Étape 4: Express-ejs-layouts détecte le layout

```javascript
// server.js
app.set("layout", "index"); // ← Utilise index.ejs comme layout
app.use(expressLayouts); // ← Middleware de layout
```

```
Express dit: "Cette vue (views/pages/home) n'est pas le layout,
je dois la rendre avec index.ejs comme wrapper!"
```

### Étape 5: Le HTML final est généré

```html
<!DOCTYPE html> ← depuis index.ejs
<html lang="fr">
  ← depuis index.ejs
  <head>
    ← depuis index.ejs
    <title>Accueil - TodoApp</title>
    ← titre dynamique
    <link rel="stylesheet" href="/css/general.css" />
    ← depuis index.ejs
  </head>
  <body>
    ← depuis index.ejs

    <header class="header">
      ← <%- include('./views/partials/header') %>
      <div class="header-container">
        <div class="logo">
          <h2>📋 TodoApp</h2>
        </div>
        <nav class="nav">
          <a href="/app/v1/">Accueil</a>
          <a href="/app/v1/forms/add">Nouvelle Tâche</a>
        </nav>
      </div>
    </header>

    <main>
      ← début <%- body %>
      <div class="container">
        <h1>📝 Gestionnaire de Tâches</h1>
        <a href="/app/v1/forms/add">➕ Nouvelle tâche</a>

        <div class="tasks-list">
          <!-- Les tâches s'affichent ici -->
          <div class="task-card">
            <h3>Ma tâche 1</h3>
            <p>Description...</p>
          </div>
          <div class="task-card">
            <h3>Ma tâche 2</h3>
            <p>Description...</p>
          </div>
        </div>
      </div>
    </main>
    ← fin <%- body %>

    <footer class="footer">
      ← <%- include('./views/partials/footer') %>
      <div class="footer-container">
        <p>&copy; 2025 TodoApp - Gestion de tâches simple et efficace</p>
      </div>
    </footer>
  </body>
  ← depuis index.ejs
</html>
← depuis index.ejs
```

### Étape 6: Le navigateur reçoit le HTML complet

```
Le navigateur affiche:

┌─────────────────────────────────────────────────┐
│  📋 TodoApp          [Accueil] [Nouvelle Tâche] │  ← HEADER
├─────────────────────────────────────────────────┤
│                                                 │
│          📝 Gestionnaire de Tâches               │
│                                                 │
│  ✓  Ma tâche 1                    [✏️] [🗑️]   │
│      Description...                             │
│                                                 │
│  ✓  Ma tâche 2                    [✏️] [🗑️]   │
│      Description...                             │
│                                                 │  ← CONTENU
│  ➕ Nouvelle tâche                             │
│                                                 │
├─────────────────────────────────────────────────┤
│  © 2025 TodoApp - Gestion de tâches             │  ← FOOTER
└─────────────────────────────────────────────────┘
```

---

## 📝 Exemple Complet: Ajouter une Tâche

### 1. Utilisateur clique sur "Nouvelle Tâche"

```
URL: http://localhost:3000/app/v1/forms/add
```

### 2. Route appelée

```javascript
// backend/routes/formRoute.js
router.get("/add", formController.affForm);
```

### 3. Controller affiche le formulaire

```javascript
// backend/controller/formController.js
const affForm = (req, res) => {
  res.render("views/pages/add", {
    title: "Nouvelle Tâche - TodoApp",
  });
};
```

### 4. Express-ejs-layouts applique le layout

```
views/pages/add.ejs + index.ejs
        ↓
    HTML Final
```

### 5. Le navigateur affiche

```
┌─────────────────────────────────────────────────┐
│  📋 TodoApp          [Accueil] [Nouvelle Tâche] │  ← HEADER
├─────────────────────────────────────────────────┤
│                                                 │
│            ➕ Nouvelle Tâche                     │
│                                                 │
│  [Titre *]     [___________________]            │
│  [Description] [___________________]            │
│                [___________________]            │
│                [___________________]            │
│                                                 │  ← CONTENU
│  [Créer] [Annuler]                             │
│                                                 │
├─────────────────────────────────────────────────┤
│  © 2025 TodoApp - Gestion de tâches             │  ← FOOTER
└─────────────────────────────────────────────────┘
```

---

## 🔀 Comment Express-ejs-layouts Fonctionne

```javascript
// Sans express-ejs-layouts (❌ Pas automatique)
// - Chaque vue doit inclure header et footer
// - Code dupliqué partout

// Avec express-ejs-layouts (✅ Automatique)
app.use(expressLayouts);
app.set('layout', 'index');

// Résultat:
res.render('views/pages/home')
  → Express-ejs-layouts intercèpte
  → Cherche index.ejs (le layout)
  → Place views/pages/home dans <%- body %>
  → Renvoie le HTML complet au navigateur
```

---

## 📊 Architecture MVC

```
REQUEST
  ↓
ROUTE (backend/routes/indexRoute.js)
  GET /app/v1/ → taskController.read
  ↓
CONTROLLER (backend/controller/taskController.js)
  - Récupère les données de la DB
  - Appelle res.render('views/pages/home', { tasks })
  ↓
EXPRESS-EJS-LAYOUTS
  - Détecte que ce n'est pas le layout
  - Applique index.ejs comme wrapper
  ↓
MODEL (backend/model/taskModel.js)
  - Schéma MongoDB pour Task
  ↓
VIEW (frontend/src/index.ejs + views/pages/home.ejs)
  - index.ejs: Structure HTML + header + footer
  - home.ejs: Contenu spécifique
  ↓
RESPONSE (HTML complet au navigateur)
```

---

## 💡 Points Clés

| Aspect            | Avant                                  | Après                          |
| ----------------- | -------------------------------------- | ------------------------------ |
| **Header/Footer** | Répétés dans chaque page               | Une seule fois dans index.ejs  |
| **Maintenance**   | Modifier le header = N pages à changer | Modifier le header = 1 fichier |
| **Code**          | Dupliqué                               | DRY (Don't Repeat Yourself)    |
| **Performance**   | Même                                   | Même (très efficace)           |
| **Scalabilité**   | Difficile d'ajouter des pages          | Facile d'ajouter des pages     |

---

## 🚀 Pour Ajouter une Nouvelle Page

### Avant (avec duplication)

```javascript
// new-feature.ejs
<%- include('../partials/header') %>
<div class="container">
  <!-- Contenu unique -->
</div>
<%- include('../partials/footer') %>
```

**4 lignes de code dupliqué + 8 lignes de contenu = 12 lignes**

### Après (avec layout)

```javascript
// new-feature.ejs
<div class="container">
  <!-- Contenu unique UNIQUEMENT -->
</div>

// Dans le controller:
res.render('views/pages/new-feature', { title: 'Nouvelle Page' })
```

**8 lignes de contenu UNIQUEMENT (header/footer = automatiques)**

---

## ✅ Vérification Visuelle

Quand tu visiteras http://localhost:3000/app/v1/, tu verras:

```
┌─────────────────────────────────────┐
│ [HEADER - DYNAMIQUE]                │ ← include('./views/partials/header')
├─────────────────────────────────────┤
│                                     │
│ [CONTENU - PAGES/HOME.EJS]          │ ← <%- body %>
│                                     │
├─────────────────────────────────────┤
│ [FOOTER - DYNAMIQUE]                │ ← include('./views/partials/footer')
└─────────────────────────────────────┘
```

Tous les éléments sont ensemble, générés par un système de layout propre! 🎉

---

## 🎓 Concepts Appris

- ✅ **Layouts EJS** - Wrapper pour les pages
- ✅ **express-ejs-layouts** - Middleware de layout
- ✅ **DRY Principle** - Don't Repeat Yourself
- ✅ **Architecture MVC** - Model-View-Controller
- ✅ **Dynamic Rendering** - Pages dynamiques
- ✅ **Separation of Concerns** - Header/Footer séparés

---

**Voilà! Ton application utilise maintenant un système de layout professionnel! 🚀**
