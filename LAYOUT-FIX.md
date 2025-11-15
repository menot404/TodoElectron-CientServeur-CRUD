# 🎯 FIX: Layout Dynamique avec Header & Footer

## ✅ Qu'est-ce qui a été fait?

Tu as maintenant un **système de layout complet et dynamique** où:

- **index.ejs** = Template principal (wrapper)
- **header.ejs** = Navigation (inclus automatiquement)
- **footer.ejs** = Pied de page (inclus automatiquement)
- **Les pages** (home.ejs, add.ejs, edit.ejs) = Contenu dynamique

## 🏗️ Nouvelle Structure

```
index.ejs (LAYOUT PRINCIPAL)
  ├── header.ejs (Navigation dynamique)
  ├── <main> body (Contenu dynamique)
  │   ├── pages/home.ejs
  │   ├── pages/add.ejs
  │   └── pages/edit.ejs
  └── footer.ejs (Pied de page dynamique)
```

## 🔧 Modifications Appliquées

### 1. ✅ Installation d'express-ejs-layouts

```bash
npm install express-ejs-layouts
```

### 2. ✅ Configuration du server.js

```javascript
const expressLayouts = require("express-ejs-layouts");

app.set("layout", "index"); // index.ejs comme layout
app.use(expressLayouts); // Active le système de layouts
```

### 3. ✅ Actualisation de index.ejs

- Liens corrects vers les partials: `./views/partials/header`
- Utilisation de `<main>` avec `<%- body %>`
- CSS centralisé avec tous les imports

### 4. ✅ Mise à jour des controllers

- Les vues utilisent maintenant: `views/pages/home`
- Passage de paramètres dynamiques: `{ tasks, title: "..." }`

## 🚀 Comment ça Fonctionne?

### Flux de Rendu

```
1. Utilisateur visite http://localhost:3000/app/v1/
   ↓
2. Controller appelle: res.render('views/pages/home', { tasks, title: '...' })
   ↓
3. Express-ejs-layouts détecte que c'est pas le layout principal
   ↓
4. Charge index.ejs (layout) comme wrapper
   ↓
5. Insère le contenu (pages/home.ejs) dans <%- body %>
   ↓
6. Résultat final envoyé au navigateur:

   <!DOCTYPE html>
   <html>
   <head>...</head>
   <body>
       <%- include('./views/partials/header') %>
       <main>
           <!-- Contenu de pages/home.ejs -->
       </main>
       <%- include('./views/partials/footer') %>
   </body>
   </html>
```

## 📝 Exemple d'Utilisation dans un Controller

```javascript
// Dans taskController.js
const read = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });

  // Le layout index.ejs sera appliqué automatiquement!
  res.render("views/pages/home", {
    tasks, // Données
    title: "Accueil - TodoApp", // Titre dynamique
  });
};
```

## 💡 Avantages du Système de Layout

✅ **DRY** (Don't Repeat Yourself) - Header et footer définis qu'une fois
✅ **Dynamique** - Titre change selon la page
✅ **Maintenable** - Modifications du header affectent toutes les pages
✅ **Performant** - Inclusion efficace des templates
✅ **Flexible** - Possibilité d'utiliser différents layouts si besoin

## 🎨 Customisation Possible

### Changer le layout pour une page spécifique

```javascript
res.render("views/pages/special", {
  layout: "custom-layout",
  data: "...",
});
```

### Désactiver le layout pour une page

```javascript
res.render("views/pages/api", {
  layout: false, // Pas de layout
  data: "...",
});
```

## 📱 Pages Affectées

| Page    | Avant                      | Après                                              |
| ------- | -------------------------- | -------------------------------------------------- |
| Accueil | `res.render('pages/home')` | `res.render('views/pages/home', { title: '...' })` |
| Ajouter | `res.render('pages/add')`  | `res.render('views/pages/add', { title: '...' })`  |
| Éditer  | `res.render('pages/edit')` | `res.render('views/pages/edit', { title: '...' })` |
| 404     | `res.render('404')`        | `res.render('views/404', { title: '...' })`        |

## ✨ Résultat Final

**Avant**: Header et footer devaient être inclus dans chaque page

```ejs
<!-- pages/home.ejs -->
<%- include('./partials/header') %>
<div class="container">...</div>
<%- include('./partials/footer') %>
```

**Après**: Header et footer sont automatiques via le layout

```ejs
<!-- pages/home.ejs -->
<div class="container">...</div>
<!-- Le layout gère header et footer -->
```

## 🧪 Test

```bash
# 1. Redémarre le serveur
npm run dev

# 2. Visite http://localhost:3000/app/v1/

# 3. Vérifie que:
#    - Le header s'affiche ✓
#    - Les tâches s'affichent ✓
#    - Le footer s'affiche ✓

# 4. Clique sur "Nouvelle tâche"
# 5. Vérifie le titre change en "Nouvelle Tâche - TodoApp"
```

## 📦 package.json Mise à Jour

```json
{
  "dependencies": {
    "ejs": "^3.1.10",
    "express": "^5.1.0",
    "express-ejs-layouts": "^2.5.1", // NOUVEAU!
    "mongoose": "^8.19.3"
  }
}
```

## 🎉 Conclusion

Tu as maintenant un système de layout **professionnel et maintenable**!

- ✅ Header dynamique
- ✅ Footer dynamique
- ✅ Titre personnalisé par page
- ✅ Code DRY et maintenable
- ✅ Structure MVC claire

**L'application est maintenant plus professionnelle et scalable!** 🚀
