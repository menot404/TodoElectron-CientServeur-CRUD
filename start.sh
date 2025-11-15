#!/bin/bash

# INSTALLATION ET DÉMARRAGE DE TODOAPP
# ====================================

echo "📋 TodoApp - Gestionnaire de Tâches"
echo "===================================="
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null
then
    echo "❌ Node.js n'est pas installé!"
    echo "📥 Télécharge Node.js depuis https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js détecté: $(node --version)"

# Vérifier MongoDB
if ! command -v mongod &> /dev/null
then
    echo "⚠️  MongoDB n'est pas détecté dans le PATH"
    echo "📝 Conseil: Assure-toi que MongoDB est en cours d'exécution"
    echo "   Démarre MongoDB séparément ou utilise MongoDB Atlas"
fi

echo ""
echo "📦 Installation des dépendances..."
npm install

echo ""
echo "🚀 DÉMARRAGE DU SERVEUR"
echo "======================"
echo ""
echo "Mode développement (avec rechargement automatique):"
echo "   npm run dev"
echo ""
echo "Mode production:"
echo "   node server.js"
echo ""
echo "📍 L'app sera accessible sur: http://localhost:3000/app/v1/"
echo ""
echo "💾 Assure-toi que MongoDB est en cours d'exécution!"
echo ""

# Demander si on doit démarrer le serveur
read -p "Veux-tu démarrer le serveur maintenant? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]
then
    npm run dev
fi
