# 📝 TodoApp - Gestionnaire de Tâches

Une application Node.js CRUD complète pour gérer des tâches avec MongoDB et Express.

## ✨ Fonctionnalités

- ✅ **Créer** des tâches avec titre et description
- ✅ **Lire** et afficher toutes les tâches
- ✅ **Modifier** les tâches existantes
- ✅ **Supprimer** les tâches
- ✅ **Marquer comme complété** les tâches
- ✅ **Interface responsive** et moderne

## 🛠️ Technologies utilisées

- **Backend**: Node.js, Express.js
- **Base de données**: MongoDB
- **Template Engine**: EJS
- **CSS**: Personnalisé avec animations
- **Port**: 3000

## 📦 Installation

### Prérequis

- Node.js (v14+)
- MongoDB (local ou en ligne)
- npm ou yarn

### Étapes

```bash
# 1. Clone le projet
cd learnCRUD_InNodejs

# 2. Installe les dépendances
npm install

# 3. Assure-toi que MongoDB est en cours d'exécution
# Si c'est local : mongod

# 4. Lance le serveur
npm run dev
```

## 🚀 Démarrage

### Mode développement (avec nodemon)

```bash
npm run dev
```

### Mode production

```bash
node server.js
```

Le serveur démarrera sur `http://localhost:3000/app/v1/`

## 📁 Structure du projet

```
learnCRUD_InNodejs/
├── backend/
│   ├── controller/
│   │   ├── formController.js      # Contrôleur des formulaires
│   │   └── taskController.js      # Contrôleur des tâches
│   ├── data/
│   │   └── dbConfig.js            # Configuration MongoDB
│   ├── model/
│   │   └── taskModel.js           # Schéma Task
│   └── routes/
│       ├── indexRoute.js          # Routes principales
│       ├── taskRoute.js           # Routes des tâches
│       └── formRoute.js           # Routes des formulaires
├── frontend/
│   ├── public/
│   │   ├── css/                   # Feuilles de style
│   │   └── img/                   # Images
│   └── src/
│       ├── index.ejs              # Template principal
│       └── views/
│           ├── pages/
│           │   ├── home.ejs       # Page d'accueil
│           │   ├── add.ejs        # Formulaire d'ajout
│           │   └── edit.ejs       # Formulaire d'édition
│           └── partials/
│               ├── header.ejs     # En-tête
│               └── footer.ejs     # Pied de page
├── server.js                       # Point d'entrée principal
├── package.json                    # Dépendances npm
└── README.md                       # Documentation
```

## 🔌 Points de terminaison API

### Tâches

- `GET /app/v1/` - Affiche toutes les tâches
- `POST /app/v1/tasks` - Crée une nouvelle tâche
- `POST /app/v1/tasks/:id` - Met à jour une tâche
- `POST /app/v1/tasks/:id/delete` - Supprime une tâche
- `POST /app/v1/tasks/:id/toggle` - Bascule le statut complété

### Formulaires

- `GET /app/v1/forms/add` - Affiche le formulaire d'ajout
- `GET /app/v1/forms/edit/:id` - Affiche le formulaire d'édition

## 🗄️ Schéma de la base de données

### Task

```javascript
{
  title: String (requis),
  description: String,
  completed: Boolean (défaut: false),
  createdAt: Date (défaut: maintenant)
}
```

## 🎨 Design

L'application utilise un design moderne avec:

- Gradient violet/mauve
- Animations lisses
- Layout responsive (mobile-first)
- Icônes emoji pour une meilleure UX

## 🐛 Corrections apportées

✅ Ajout du `await` manquant dans `dbConfig.js`
✅ Correction de `Completed` → `completed` dans le schéma
✅ Correction de `createAt` → `createdAt` dans le schéma
✅ Import du modèle Task manquant dans `formController.js`
✅ Correction de la route `/add` dans `formRoute.js`
✅ Chemins des vues corrigés dans `server.js`
✅ Création des fichiers CSS manquants
✅ Création des partials header et footer
✅ Redirection correcte vers les bonnes URLs

## 💡 Conseil

Pour MongoDB local:

```bash
# Ouvre un terminal séparé
mongod
```

## 📝 License

ISC

---

**Créé avec ❤️ pour apprendre les bases du CRUD avec Node.js**
