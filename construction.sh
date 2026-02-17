# Création de la racine
mkdir -p backend/app

# Création de la structure API (Versioning)
mkdir -p backend/app/api/v1/endpoints

# Création des modules principaux (Architecture en couches)
mkdir -p backend/app/core       # Config et Sécurité
mkdir -p backend/app/schemas    # Modèles Pydantic (Data Transfer Objects)
mkdir -p backend/app/services   # Logique métier et Génération de doc
mkdir -p backend/app/templates  # Stockage des fichiers .docx et Jinja

# Création du dossier de tests
mkdir -p backend/tests

# Feedback visuel
echo "✅ Arborescence backend créée avec succès sous ./backend"
tree backend  # Si 'tree' est installé, sinon ça affichera une erreur mineure sans conséquence