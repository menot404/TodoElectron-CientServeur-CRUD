#!/bin/bash

# SCRIPT DE VÉRIFICATION DU PROJET
# ================================

echo "🔍 VÉRIFICATION DE LA STRUCTURE DU PROJET TodoApp"
echo "================================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteurs
PASSED=0
FAILED=0

# Fonction pour vérifier un fichier
check_file() {
    local file=$1
    local description=$2
    
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $description"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $description"
        ((FAILED++))
    fi
}

# Fonction pour vérifier un répertoire
check_dir() {
    local dir=$1
    local description=$2
    
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} $description"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $description"
        ((FAILED++))
    fi
}

# Vérifications des répertoires
echo "📁 Répertoires:"
check_dir "backend" "Répertoire backend"
check_dir "backend/controller" "Répertoire backend/controller"
check_dir "backend/data" "Répertoire backend/data"
check_dir "backend/middleware" "Répertoire backend/middleware"
check_dir "backend/model" "Répertoire backend/model"
check_dir "backend/routes" "Répertoire backend/routes"
check_dir "frontend" "Répertoire frontend"
check_dir "frontend/public" "Répertoire frontend/public"
check_dir "frontend/src" "Répertoire frontend/src"
check_dir "frontend/src/views" "Répertoire frontend/src/views"

echo ""
echo "📄 Fichiers principaux:"
check_file "server.js" "Fichier server.js"
check_file "package.json" "Fichier package.json"
check_file "README.md" "Fichier README.md"
check_file ".gitignore" "Fichier .gitignore"
check_file ".env.example" "Fichier .env.example"
check_file "CORRECTIONS.md" "Fichier CORRECTIONS.md"

echo ""
echo "🔌 Backend - Controllers:"
check_file "backend/controller/taskController.js" "taskController.js"
check_file "backend/controller/formController.js" "formController.js"

echo ""
echo "📊 Backend - Data & Models:"
check_file "backend/data/dbConfig.js" "dbConfig.js"
check_file "backend/model/taskModel.js" "taskModel.js"

echo ""
echo "🛣️  Backend - Routes:"
check_file "backend/routes/indexRoute.js" "indexRoute.js"
check_file "backend/routes/taskRoute.js" "taskRoute.js"
check_file "backend/routes/formRoute.js" "formRoute.js"

echo ""
echo "⚙️  Backend - Middleware:"
check_file "backend/middleware/errorHandler.js" "errorHandler.js"

echo ""
echo "🎨 Frontend - CSS:"
check_file "frontend/public/css/general.css" "general.css"
check_file "frontend/public/css/header.css" "header.css"
check_file "frontend/public/css/footer.css" "footer.css"
check_file "frontend/public/css/home.css" "home.css"
check_file "frontend/public/css/add.css" "add.css"
check_file "frontend/public/css/edit.css" "edit.css"

echo ""
echo "📝 Frontend - Views:"
check_file "frontend/src/index.ejs" "index.ejs (layout principal)"
check_file "frontend/src/views/layout.ejs" "layout.ejs"
check_file "frontend/src/views/pages/home.ejs" "home.ejs"
check_file "frontend/src/views/pages/add.ejs" "add.ejs"
check_file "frontend/src/views/pages/edit.ejs" "edit.ejs"
check_file "frontend/src/views/404.ejs" "404.ejs"
check_file "frontend/src/views/error.ejs" "error.ejs"

echo ""
echo "🔗 Frontend - Partials:"
check_file "frontend/src/views/partials/header.ejs" "header.ejs"
check_file "frontend/src/views/partials/footer.ejs" "footer.ejs"

echo ""
echo "================================================="
echo -e "${GREEN}✓ Fichiers corrects: $PASSED${NC}"
echo -e "${RED}✗ Fichiers manquants: $FAILED${NC}"
echo "================================================="

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ TOUS LES FICHIERS SONT PRÉSENTS!${NC}"
    echo ""
    echo "🚀 Pour démarrer l'application:"
    echo "   npm install  # (déjà fait)"
    echo "   npm run dev"
    echo ""
    echo "📍 L'app sera accessible sur: http://localhost:3000/app/v1/"
    exit 0
else
    echo -e "${RED}❌ CERTAINS FICHIERS MANQUENT!${NC}"
    exit 1
fi
