from pydantic import BaseModel, Field
from typing import List, Optional

# --- 1. SOUS-MODÈLES (Pour les tableaux dynamiques) ---

class DocumentReference(BaseModel):
    """Correspond au tableau 'Documents de référence'"""
    emetteur: str
    document: str
    version: str

class GlossaireItem(BaseModel):
    """Correspond au tableau 'Glossaire'"""
    abreviation: str
    signification: str

class Acteur(BaseModel):
    """Correspond au tableau 'Acteurs'"""
    acteur: str
    role: str
    droits: str
    commentaires: Optional[str] = ""

class SchemaItem(BaseModel):
    """Correspond aux images dans 'Schéma fonctionnel'"""
    titre: str
    description: str
    image: str  # Chemin ou base64 de l'image

class BriqueFonctionnelle(BaseModel):
    """Correspond au tableau 'Description fonctionnelle'"""
    brique: str
    description: str

class EchangeDonnees(BaseModel):
    """Correspond au tableau 'Échanges de données'"""
    type_echange: str
    brique_fonctionnelle: str
    source: str
    destination: str
    type_donnees: str
    volumetrie: str
    frequence: str
    frequenceechange: str
    hno: str

class ChoixTechnologique(BaseModel):
    """Correspond au tableau 'Choix Technologiques'"""
    tiers: str
    produit: str
    version: str

class DnsNom(BaseModel):
    """Correspond au tableau 'Nom DNS'"""
    nom_dns: str
    machine_associe: str

class DependanceExterne(BaseModel):
    """Correspond au tableau 'Dépendances externes sur mon application'"""
    dependance: str
    impact: str

class DependanceAppExterne(BaseModel):
    """Correspond au tableau 'Dépendances de mon application sur des services externes'"""
    name_application: str
    description_impact: str

class VM(BaseModel):
    """Correspond au tableau 'Machines Virtuelles'"""
    environnement: str
    nom: str
    resilience: str  # Actif/Actif, Actif/Passif
    role: str
    os: str
    cpu: int
    ram: int

# --- 2. MODÈLE PRINCIPAL (Le Document Entier) ---

class DatRequest(BaseModel):
    """
    Ce modèle représente l'intégralité des données injectées dans le template Word.
    Chaque champ correspond à une variable Jinja2 {{ variable }} dans le docx.
    """
    # 1. Infos Générales
    titre_projet: str
    chef_projet: str
    contact_tech: str
    date: str
    description_doc: str
    objet_document: str

    # 2. Listes (Tableaux)
    documents_reference: List[DocumentReference] = []
    glossaire: List[GlossaireItem] = []
    acteurs: List[Acteur] = []
    
    # 3. Fonctionnel
    has_schema: bool = False
    schema_description: Optional[str] = ""
    schemas: List[SchemaItem] = []
    briques_fonctionnelles: List[BriqueFonctionnelle] = []
    echanges_donnees: List[EchangeDonnees] = []

    # 4. Technique & Architecture
    description_architecture: str
    description_authentification: str
    description_administrationtechnique: str
    description_adminfonctionnelle: str
    description_interapplicative: str
    choix_technologiques: List[ChoixTechnologique] = []
    segmentation_dr: str  # "Oui" ou "Non" (DR = Diffusion Restreinte)
    dns_nom: List[DnsNom] = []

    # 5. Cycle de vie
    deploiement: str
    migration_reprise: str
    supervision: str
    sauvegarde_restauration: str

    # 6. Dépendances
    dependances_externes: List[DependanceExterne] = []
    dependance_app_externes: List[DependanceAppExterne] = []

    # 7. Planification & Besoins
    contraintes: str
    vms: List[VM] = []
    niveau_services: str