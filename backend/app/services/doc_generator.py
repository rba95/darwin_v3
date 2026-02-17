import os
from pathlib import Path
from docxtpl import DocxTemplate
from datetime import datetime

# On définit des constantes pour les chemins (Bonne pratique)
BASE_DIR = Path(__file__).resolve().parent.parent.parent  # backend/
TEMPLATE_DIR = BASE_DIR / "app" / "templates"
OUTPUT_DIR = BASE_DIR / "generated_docs"

class DocumentService:
    def __init__(self):
        # On s'assure que le dossier de sortie existe
        os.makedirs(OUTPUT_DIR, exist_ok=True)

    def generate_dat(self, data: dict) -> str:
        """
        Génère un DAT à partir d'un dictionnaire de données.
        
        Args:
            data (dict): Les données validées par Pydantic (.model_dump())
            
        Returns:
            str: Le chemin absolu du fichier généré
        """
        template_path = TEMPLATE_DIR / "dat_template.docx"
        
        # 1. Vérification de l'existence du template
        if not template_path.exists():
            raise FileNotFoundError(f"Le template est introuvable : {template_path}")

        # 2. Chargement du template
        doc = DocxTemplate(template_path)

        # 3. Rendu (Injection des variables Jinja2)
        # docxtpl gère les boucles {% for %} et conditions {% if %} définies dans le Word
        doc.render(data)

        # 4. Construction du nom de fichier unique
        # Format: DAT_NomProjet_Date_Heure.docx
        safe_title = "".join([c for c in data['titre_projet'] if c.isalnum() or c in (' ', '-', '_')]).strip()
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"DAT_{safe_title}_{timestamp}.docx"
        output_path = OUTPUT_DIR / filename

        # 5. Sauvegarde
        doc.save(output_path)
        
        return str(output_path)