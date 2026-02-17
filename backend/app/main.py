from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# ✅ CET IMPORT EST CELUI QUI MANQUAIT :
from app.api.v1.endpoints.generation import router as generation_router

app = FastAPI(title="DARWIN API")

# --- CONFIGURATION CORS ---
# Indispensable pour que ton React (port 5173) puisse parler à FastAPI (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ ON UTILISE LE NOM QU'ON A DONNÉ DANS L'IMPORT CI-DESSUS
app.include_router(generation_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"status": "DARWIN API is running"}