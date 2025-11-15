# 🎯 GUIDE UTILISATEUR - TodoApp

Bienvenue dans **TodoApp** - Votre gestionnaire de tâches personnel!

## ✨ Démarrage Rapide

### Étape 1: Préparer l'environnement

```bash
# Assure-toi que MongoDB est en cours d'exécution
mongod

# Dans un autre terminal, démarre l'app
cd learnCRUD_InNodejs
npm run dev
```

### Étape 2: Accéder à l'application

Ouvre ton navigateur et visite:

```
http://localhost:3000/app/v1/
```

### Étape 3: Commencer à utiliser

Tu verras la page d'accueil avec les contrôles pour gérer tes tâches.

---

## 📝 Fonctionnalités de Base

### 1. **Ajouter une nouvelle tâche** ➕

1. Clique sur le bouton **"➕ Nouvelle tâche"**
2. Remplis le formulaire:
   - **Titre** (obligatoire) - Ex: "Faire les courses"
   - **Description** (optionnel) - Ex: "Lait, pain, œufs"
3. Clique sur **"Créer"**

✅ La tâche apparaît en haut de la liste!

---

### 2. **Voir toutes tes tâches** 📋

La page d'accueil affiche:

- **Liste complète** de toutes tes tâches
- Tâches les **plus récentes en premier**
- **Statut** (complétée ou en cours)
- **Date de création** pour chaque tâche

---

### 3. **Marquer comme complété** ✓

Pour chaque tâche:

1. Clique sur le bouton **✓** (coche)
2. La tâche devient **grisée** et **barrée**
3. Reclique pour la dé-compléter **↩️**

💡 Les tâches complétées restent visibles avec un style différent

---

### 4. **Modifier une tâche** ✏️

Pour chaque tâche:

1. Clique sur le bouton **✏️** (crayon)
2. Tu arriveras au **formulaire d'édition**
3. Modifie:
   - Le titre
   - La description
   - Le statut (complétée ou non)
4. Clique sur **"Enregistrer"**

✅ Les modifications sont appliquées immédiatement!

---

### 5. **Supprimer une tâche** 🗑️

Pour chaque tâche:

1. Clique sur le bouton **🗑️** (poubelle)
2. Une confirmation apparaît: "Supprimer cette tâche ?"
3. Confirme en cliquant **OK**

⚠️ Cette action est **irréversible**!

---

## 🎨 Interface & Design

### Couleurs

- **Violet/Mauve** - Dégradé principal
- **Blanc** - Cartes des tâches
- **Vert** - Tâches complétées
- **Gris** - Texte secondaire

### Icônes Emoji

| Icône | Signification          |
| ----- | ---------------------- |
| ✓     | Marquer comme complété |
| ↩️    | Dé-compléter           |
| ✏️    | Modifier               |
| 🗑️    | Supprimer              |
| ➕    | Ajouter                |
| 📝    | Nouvelle tâche         |

### Responsive

L'app fonctionne sur:

- 💻 **Desktop**
- 📱 **Tablet**
- 📱 **Mobile**

---

## 💾 Stockage des Données

Toutes tes tâches sont stockées dans **MongoDB**.

### Données sauvegardées:

- ✅ Titre de la tâche
- ✅ Description
- ✅ Statut (complétée ou non)
- ✅ Date de création

### Sécurité:

- Les données sont **persistantes** (sauvegardées)
- Chaque tâche a un **ID unique**
- Les modifications sont **immédiates**

---

## 🚀 Commandes Terminal

```bash
# Démarrer l'application (mode développement avec auto-reload)
npm run dev

# Démarrer l'application (mode production)
node server.js

# Vérifier la structure du projet
bash check-structure.sh

# Démarrage assisté
bash start.sh
```

---

## 🆘 Dépannage

### L'app ne démarre pas

**Problème**: "Connection refused" ou "MongoDB not available"

**Solution**:

1. Assure-toi que MongoDB est en cours d'exécution
2. Dans un terminal séparé, tape: `mongod`
3. Redémarre l'app: `npm run dev`

### Les tâches ne s'affichent pas

**Problème**: La page est vide

**Solution**:

1. Ajoute une nouvelle tâche
2. Attends que la page se rafraîchisse
3. Si ça ne marche pas, ouvre DevTools (F12) et cherche les erreurs

### Les styles ne s'appliquent pas

**Problème**: Le design est cassé

**Solution**:

1. Rafraîchis la page (Ctrl+R ou Cmd+R)
2. Vide le cache (Ctrl+Shift+R)
3. Redémarre le serveur

### Une action ne fonctionne pas

**Problème**: Ajouter/Modifier/Supprimer ne marche pas

**Solution**:

1. Ouvre la console (F12)
2. Regarde les messages d'erreur
3. Vérifier que tu as rempli les champs requis
4. Redémarre le serveur

---

## 💡 Conseils d'Utilisation

### 🎯 Pour être productif

1. **Ajoute des descriptions** - Elles t'aident à te souvenir
2. **Marque comme complété** - C'est satisfaisant et utile pour le suivi
3. **Supprime les anciennes tâches** - Garder la liste à jour
4. **Utilise des titres clairs** - Ex: "Appeler le plombier" au lieu de "Faire"

### ⚡ Raccourcis

| Action          | Bouton       |
| --------------- | ------------ |
| Nouvelle tâche  | Haut de page |
| Marquer complet | ✓            |
| Éditer          | ✏️           |
| Supprimer       | 🗑️           |

### 🔄 Workflow recommandé

```
1. Matin: Ajoute tes tâches du jour
   ↓
2. Au fur et à mesure: Marque comme complétées
   ↓
3. Soir: Supprime les anciennes tâches
   ↓
4. Répète!
```

---

## 📞 Support

### Documentation disponible

1. **README.md** - Vue d'ensemble du projet
2. **CORRECTIONS.md** - Détails techniques des corrections
3. **SUMMARY.md** - Résumé complet
4. **Ce fichier** - Guide utilisateur

### Fichiers utiles

- `.env.example` - Configuration
- `server.js` - Point d'entrée
- `backend/` - Logique serveur
- `frontend/` - Interface utilisateur

---

## 🎓 Qu'as-tu appris?

En utilisant TodoApp, tu pratiques:

- ✅ **Interface utilisateur** - Navigation et interaction
- ✅ **Formulaires** - Saisie de données
- ✅ **Persistance** - Sauvegarde en base de données
- ✅ **CRUD** - Create, Read, Update, Delete
- ✅ **Responsive Design** - Adaptabilité mobile

---

## 🌟 Prochaines Étapes (Pour Développeurs)

Tu peux améliorer l'app en ajoutant:

1. **Catégories** - Organiser par type de tâche
2. **Priorités** - Haute, Moyenne, Basse
3. **Dates d'échéance** - Rappels et deadlines
4. **Utilisateurs** - Multi-utilisateurs avec authentification
5. **Recherche** - Filtrer les tâches
6. **Tags** - Étiquettes pour organiser
7. **Récurrence** - Tâches répétitives
8. **Statistiques** - Graphiques de productivité

---

## 📋 Checklist de Configuration

Avant de commencer, assure-toi que:

- [ ] Node.js est installé
- [ ] MongoDB est installé et en cours d'exécution
- [ ] npm install a été exécuté
- [ ] npm run dev démarre sans erreurs
- [ ] http://localhost:3000/app/v1/ s'ouvre dans le navigateur
- [ ] Tu peux ajouter une tâche
- [ ] Tu peux marquer comme complétée
- [ ] Tu peux éditer une tâche
- [ ] Tu peux supprimer une tâche

---

## 🎉 C'est Tout!

Tu es maintenant prêt à utiliser **TodoApp** pour gérer tes tâches!

**Bon travail! 🚀**

---

_Créé avec ❤️ | Novembre 2025_
