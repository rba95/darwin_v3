from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from app.schemas.dat import DatRequest
from app.services.doc_generator import DocumentService
import os

router = APIRouter()

# On instancie le service qui va manipuler le document Word
document_service = DocumentService()

@router.post("/generate")
async def generate_dat(data: DatRequest):
    try:
        # 1. On appelle ton service pour créer le fichier
        # On suppose que ta méthode s'appelle create_docx ou similaire
        # On lui passe l'objet 'data' qui est de type DatRequest
        file_path = document_service.create_docx(data) 
        
        # 2. Vérification de sécurité
        if not file_path or not os.path.exists(file_path):
            print(f"Erreur : Le fichier {file_path} n'a pas été trouvé sur le serveur.")
            raise HTTPException(status_code=500, detail="Erreur lors de la création du fichier Word.")

        # 3. Renvoi du fichier au format Word
        return FileResponse(
            path=file_path,
            filename=f"DAT_{data.titre_projet}.docx",
            media_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )
        
    except Exception as e:
        # Si ça plante ici, le message s'affichera dans ton terminal backend
        print(f"ERREUR GÉNÉRATION : {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))